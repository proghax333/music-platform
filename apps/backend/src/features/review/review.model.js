import { Schema, Types } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

// Review model
export const createReviewModel = ({ db }) => {
  const ReviewSchema = new Schema(
    {
      author: { type: Types.ObjectId, ref: "Profile" },
      refType: { type: String },
      refId: { type: Types.ObjectId },
      rating: { type: Number },
      content: { type: String },
    },
    {
      timestamps: true,
    }
  );

  const Review = db.model("Review", ReviewSchema);
  return Review;
};

export const createReviewDataLoader = ({ Review }) => {
  return createFindDataLoader(Review);
};
