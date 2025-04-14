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
 * Paginates a Mongoose aggregate pipeline and returns GraphQL-style connection data.
 *
 * @param {Aggregate} aggregate - A Mongoose aggregate object (Model.aggregate([...]))
 * @param {Object} options - Pagination options.
 * @param {string} [options.before]
 * @param {string} [options.after]
 * @param {number} [options.first]
 * @param {number} [options.last]
 * @param {string} [options.sort='_id']
 * @returns {Promise<{ edges: Array, pageInfo: Object, totalCount: number }>}
 */
export async function paginate(
  aggregate,
  { before, after, first, last, sort = "_id", all = false },
  aggregateOptions = undefined
) {
  const sortField = sort;
  const isPaginatingBackward = !!last;

  /** @type {import("mongoose").Model} */
  const model = aggregate._model;

  const basePipeline = aggregate.pipeline();
  let sortDirection = 1;
  if (isPaginatingBackward) sortDirection = -1;

  // "All" mode: skip pagination logic
  if (all) {
    const allItems = await model
      .aggregate([...basePipeline, { $sort: { [sortField]: sortDirection } }])
      .exec();

    const edges = allItems.map((item) => ({
      node: item,
      cursor: encodeCursor(item[sortField]),
    }));

    return {
      edges,
      pageInfo: {
        startCursor: edges[0]?.cursor || null,
        endCursor: edges[edges.length - 1]?.cursor || null,
        hasNextPage: false,
        hasPreviousPage: false,
      },
      totalCount: edges.length,
    };
  }

  // Default limit = 10 if not specified
  const limit = first || last || 10;
  let cursorValue = before
    ? decodeCursor(before)
    : after
    ? decodeCursor(after)
    : null;

  if (cursorValue && sortField === "_id") {
    cursorValue = new ObjectId(cursorValue);
  }

  const matchStage = {};
  if (after) matchStage[sortField] = { $gt: cursorValue };
  if (before) matchStage[sortField] = { $lt: cursorValue };

  const paginationPipeline = [...basePipeline];
  if (before || after) {
    paginationPipeline.push({ $match: matchStage });
  }
  paginationPipeline.push({ $sort: { [sortField]: sortDirection } });
  paginationPipeline.push({ $limit: limit + 1 });

  const countPipeline = [...basePipeline, { $count: "count" }];

  const [results, totalResult] = await Promise.all([
    model.aggregate(paginationPipeline, aggregateOptions).exec(),
    model.aggregate(countPipeline, aggregateOptions).exec(),
  ]);

  const totalCount = totalResult[0]?.count || 0;

  const hasExtraItem = results.length > limit;
  if (hasExtraItem) results.pop();

  if (isPaginatingBackward) results.reverse();

  const edges = results.map((item) => ({
    node: item,
    cursor: encodeCursor(item[sortField]),
  }));

  const pageInfo = {
    startCursor: edges[0]?.cursor || null,
    endCursor: edges[edges.length - 1]?.cursor || null,
    hasNextPage: isPaginatingBackward ? !!before : hasExtraItem,
    hasPreviousPage: isPaginatingBackward ? hasExtraItem : !!after,
  };

  return { edges, pageInfo, totalCount };
}
