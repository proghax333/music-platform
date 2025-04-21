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
 * @param {Object} [options.filter]
 * @param {Array<{ field: string, direction: 'asc' | 'desc' }>} [options.sort]
 * @param {boolean} [options.all]
 */
export async function paginate(
  aggregate,
  {
    before,
    after,
    first,
    last,
    filter = {},
    sort = [{ field: "_id", direction: "asc" }],
    all = false,
  },
  aggregateOptions = undefined
) {
  const model = aggregate._model;
  const basePipeline = aggregate.pipeline();

  if (Object.keys(filter).length) {
    basePipeline.push({ $match: filter });
  }

  const isPaginatingBackward = !!last;
  const limit = first ?? last ?? 10;

  // Build sort object for MongoDB
  const sortObj = {};
  for (const { field, direction } of sort) {
    sortObj[field] =
      (isPaginatingBackward ? -1 : 1) * (direction === "desc" ? -1 : 1);
  }

  // "All" mode
  if (all) {
    const allItems = await model
      .aggregate([...basePipeline, { $sort: sortObj }])
      .exec();

    const edges = allItems.map((item) => ({
      node: item,
      cursor: encodeCursor(buildCursor(item, sort)),
    }));

    return {
      edges,
      pageInfo: {
        startCursor: edges[0]?.cursor ?? null,
        endCursor: edges.at(-1)?.cursor ?? null,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      totalCount: edges.length,
    };
  }

  // Decode cursor
  const cursorData = before
    ? decodeCursor(before)
    : after
    ? decodeCursor(after)
    : null;

  // Build cursor comparison filter
  const cursorFilter = buildCursorFilter(
    sort,
    cursorData,
    before ? "before" : after ? "after" : null
  );

  const paginationPipeline = [...basePipeline];
  if (cursorFilter) {
    paginationPipeline.push({ $match: cursorFilter });
  }

  paginationPipeline.push({ $sort: sortObj });
  paginationPipeline.push({ $limit: limit + 1 });

  const countPipeline = [...basePipeline, { $count: "count" }];
  const [results, totalResult] = await Promise.all([
    model.aggregate(paginationPipeline, aggregateOptions).exec(),
    model.aggregate(countPipeline, aggregateOptions).exec(),
  ]);

  const totalCount = totalResult[0]?.count ?? 0;

  const hasExtraItem = results.length > limit;
  if (hasExtraItem) results.pop();
  if (isPaginatingBackward) results.reverse();

  const edges = results.map((item) => ({
    node: item,
    cursor: encodeCursor(buildCursor(item, sort)),
  }));

  return {
    edges,
    pageInfo: {
      startCursor: edges[0]?.cursor ?? null,
      endCursor: edges.at(-1)?.cursor ?? null,
      hasNextPage: isPaginatingBackward ? !!before : hasExtraItem,
      hasPreviousPage: isPaginatingBackward ? hasExtraItem : !!after,
    },
    totalCount,
  };
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
