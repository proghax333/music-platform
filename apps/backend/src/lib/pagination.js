import { Buffer } from "node:buffer";
import { ObjectId } from "./types.js";

export function encodeCursor(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64");
}

export function decodeCursor(cursor) {
  try {
    return JSON.parse(Buffer.from(cursor, "base64").toString());
  } catch {
    return null;
  }
}

/**
 * GraphQL-style pagination over a Mongoose aggregate pipeline.
 *
 * @param {Aggregate} aggregate - Mongoose aggregate instance.
 * @param {Object} options
 * @param {string} [options.before]
 * @param {string} [options.after]
 * @param {number} [options.first]
 * @param {number} [options.last]
 * @param {number} [options.offset]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 * @param {Object} [options.filter]
 * @param {Array<{ field: string, direction: 'asc' | 'desc' }>} [options.sort]
 * @param {boolean} [options.all]
 * @param {string} [options.type] - "cursor", "offset", or "page"
 */
export async function paginate(
  aggregate,
  {
    before,
    after,
    first,
    last,
    offset = 0,
    limit = 10,
    page = 1,
    filter = {},
    sort = [{ field: "_id", direction: "asc" }],
    all = false,
    type = "cursor", // "cursor", "offset", or "page"
  },
  aggregateOptions = undefined
) {
  const model = aggregate._model;
  const basePipeline = aggregate.pipeline();

  if (Object.keys(filter).length) {
    basePipeline.push({ $match: filter });
  }

  const sortObj = {};
  for (const { field, direction } of sort) {
    sortObj[field] = direction === "desc" ? -1 : 1;
  }

  // Handle "all" mode
  if (all) {
    const allItems = await model
      .aggregate([...basePipeline, { $sort: sortObj }])
      .exec();

    const edges = allItems.map((item) => ({
      node: item,
      cursor: encodeCursor(buildCursor(item, sort)),
    }));

    const totalCount = allItems.length;

    const pageInfo = {
      startCursor: null,
      endCursor: null,
      hasNextPage: false,
      hasPreviousPage: false,
      currentPage: null,
      totalPages: null,
      offset: null,
    };

    if (type === "cursor") {
      pageInfo.startCursor = edges[0]?.cursor ?? null;
      pageInfo.endCursor = edges.at(-1)?.cursor ?? null;
      // no next/prev in all mode
    }

    if (type === "offset") {
      pageInfo.offset = 0;
      // all results are returned, so no paging
    }

    if (type === "page") {
      pageInfo.currentPage = 1;
      pageInfo.totalPages = 1;
    }

    return {
      edges,
      nodes: allItems,
      pageInfo,
      totalCount,
    };
  }

  let results = [];
  let totalCount = 0;
  const countPipeline = [...basePipeline, { $count: "count" }];

  if (type === "cursor") {
    const isPaginatingBackward = !!last;
    const cursorLimit = first ?? last ?? 10;

    for (const { field, direction } of sort) {
      sortObj[field] =
        (isPaginatingBackward ? -1 : 1) * (direction === "desc" ? -1 : 1);
    }

    const cursorData = before
      ? decodeCursor(before)
      : after
      ? decodeCursor(after)
      : null;

    const cursorFilter = buildCursorFilter(
      sort,
      cursorData,
      before ? "before" : after ? "after" : null
    );

    const pipeline = [...basePipeline];
    if (cursorFilter) pipeline.push({ $match: cursorFilter });
    pipeline.push({ $sort: sortObj });
    pipeline.push({ $limit: cursorLimit + 1 });

    const [res, countRes] = await Promise.all([
      model.aggregate(pipeline, aggregateOptions).exec(),
      model.aggregate(countPipeline, aggregateOptions).exec(),
    ]);

    results = res;
    totalCount = countRes[0]?.count ?? 0;

    const hasExtraItem = results.length > cursorLimit;
    if (hasExtraItem) results.pop();
    if (isPaginatingBackward) results.reverse();

    const edges = results.map((item) => ({
      node: item,
      cursor: encodeCursor(buildCursor(item, sort)),
    }));

    return {
      edges,
      nodes: results,
      pageInfo: {
        startCursor: edges[0]?.cursor ?? null,
        endCursor: edges.at(-1)?.cursor ?? null,
        hasNextPage: isPaginatingBackward ? !!before : hasExtraItem,
        hasPreviousPage: isPaginatingBackward ? hasExtraItem : !!after,
        currentPage: null,
        totalPages: null,
        offset: null,
      },
      totalCount,
    };
  }

  if (type === "offset") {
    const pipeline = [
      ...basePipeline,
      { $sort: sortObj },
      { $skip: offset },
      { $limit: limit },
    ];

    const [res, countRes] = await Promise.all([
      model.aggregate(pipeline, aggregateOptions).exec(),
      model.aggregate(countPipeline, aggregateOptions).exec(),
    ]);

    results = res;
    totalCount = countRes[0]?.count ?? 0;

    return {
      edges: results.map((node) => ({
        node,
        cursor: encodeCursor(buildCursor(node, sort)),
      })),
      nodes: results,
      pageInfo: {
        hasNextPage: offset + limit < totalCount,
        hasPreviousPage: offset > 0,
        offset,
      },
      totalCount,
    };
  }

  if (type === "page") {
    const pageOffset = (page - 1) * limit;

    const pipeline = [
      ...basePipeline,
      { $sort: sortObj },
      { $skip: pageOffset },
      { $limit: limit },
    ];

    const [res, countRes] = await Promise.all([
      model.aggregate(pipeline, aggregateOptions).exec(),
      model.aggregate(countPipeline, aggregateOptions).exec(),
    ]);

    results = res;
    totalCount = countRes[0]?.count ?? 0;

    const totalPages = Math.ceil(totalCount / limit);

    return {
      edges: results.map((node) => ({
        node,
        cursor: encodeCursor(buildCursor(node, sort)),
      })),
      nodes: results,
      pageInfo: {
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        currentPage: page,
        totalPages,
        offset: pageOffset,
      },
      totalCount,
    };
  }

  throw new Error(`Unknown pagination type: ${type}`);
}

/**
 * Build a comparison filter for the cursor value.
 */
function buildCursorFilter(sort, cursorData, direction) {
  if (!cursorData) return null;

  const operator = direction === "after" ? "$gt" : "$lt";

  const orConditions = [];

  for (let i = 0; i < sort.length; i++) {
    const andPart = [];
    for (let j = 0; j < i; j++) {
      andPart.push({ [sort[j].field]: cursorData[sort[j].field] });
    }

    const field = sort[i].field;
    const sortDir = sort[i].direction === "desc" ? -1 : 1;
    const compOp = (direction === "after") === (sortDir === 1) ? "$gt" : "$lt";

    andPart.push({ [field]: { [compOp]: cursorData[field] } });
    orConditions.push({ $and: andPart });
  }

  return { $or: orConditions };
}

/**
 * Extract cursor fields from an item.
 */
function buildCursor(item, sort) {
  const cursor = {};
  for (const { field } of sort) {
    cursor[field] = item[field];
  }
  return cursor;
}
