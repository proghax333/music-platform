import DataLoader from "dataloader";

export const createFindDataLoader = (Model) => {
  const loader = new DataLoader(async (keys) => {
    const idMap = {};
    for (const idx in keys) {
      idMap[keys[idx]] = idx;
    }

    const items = await Model.find({
      _id: { $in: keys },
    });

    const result = Array(keys.length);
    for (const item of items) {
      result[idMap[item._id]] = item;
    }

    return result;
  });

  return loader;
};
