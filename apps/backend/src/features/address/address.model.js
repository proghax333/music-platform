import mongoose, { Schema, Types } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createAddressModel = ({ db }) => {
  const AddressSchema = new Schema(
    {
      profile: { type: Schema.Types.ObjectId, ref: "Profile" },

      line1: String,
      line2: String,
      lines: [String],
      landmark: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
    { timestamps: true }
  );

  return db.model("Address", AddressSchema);
};

/**
 * @param {{ Address: mongoose.Model }} params
 */
export const createAddressDataLoader = ({ Address }) => {
  return createFindDataLoader(Address);
};
