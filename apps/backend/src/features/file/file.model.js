import mongoose, { Schema, Types } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

///////////////////////
// File Model
///////////////////////

/**
 * @param {Object} params
 * @param {mongoose.Connection} params.db
 * @returns {mongoose.Model}
 */
export const createFileModel = ({ db }) => {
  const FileSchema = new Schema(
    {
      name: {
        type: String,
        // required: true,
      },
      size: {
        type: Number,
        // required: true, // in bytes
      },
      type: {
        type: String,
        // required: true, // MIME type (e.g., image/png, application/pdf)
      },
      url: {
        type: String,
        required: true, // Public or internal URL
      },
      uploader: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      metadata: {
        type: Object,
        default: {},
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  return db.model("File", FileSchema);
};

/**
 * @param {{ File: mongoose.Model }} params
 */
export const createFileDataLoader = ({ File }) => {
  return createFindDataLoader(File);
};
