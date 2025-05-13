import { Schema } from "mongoose";
import { createFindDataLoader } from "../../lib/dataloader.js";

/**
 * Creates and returns the Course model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db
 * @returns {import("mongoose").Model}
 */
export const createCourseModel = ({ db }) => {
  const CourseSchema = new Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String, default: "" },
      instructors: [
        {
          type: Schema.Types.ObjectId,
          ref: "Profile",
          required: true,
        },
      ],
      tags: [String],
      images: [{ type: Schema.Types.ObjectId, ref: "File" }],
      published: { type: Boolean, default: false },
      sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    },
    { timestamps: true }
  );

  return db.model("Course", CourseSchema);
};

export const createCourseDataLoader = ({ Course }) => {
  return createFindDataLoader(Course);
};

/**
 * Creates and returns the Section model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db
 * @returns {import("mongoose").Model}
 */
export const createSectionModel = ({ db }) => {
  const SectionSchema = new Schema(
    {
      title: { type: String, required: true, trim: true },
      course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
      items: [
        {
          _id: false,
          ref: {
            type: Schema.Types.ObjectId,
            required: true,
            refPath: "items.type",
          },
          type: {
            type: String,
            enum: ["Lesson"],
            required: true,
          },
        },
      ],
      order: { type: Number, required: true },
    },
    { timestamps: true }
  );

  return db.model("Section", SectionSchema);
};

export const createSectionDataLoader = ({ Section }) => {
  return createFindDataLoader(Section);
};

/**
 * Creates and returns the Lesson model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db
 * @returns {import("mongoose").Model}
 */
export const createLessonModel = ({ db }) => {
  const LessonSchema = new Schema(
    {
      title: { type: String, required: true, trim: true },
      content: { type: String },
      videoUrl: { type: String },
      resources: [
        {
          title: String,
          file: { type: Schema.Types.ObjectId, ref: "File" },
          type: { type: String, enum: ["pdf", "link", "image", "file"] },
        },
      ],
      tags: {
        type: [{ type: String }],
        default: [],
      },
    },
    { timestamps: true }
  );

  return db.model("Lesson", LessonSchema);
};

export const createLessonDataLoader = ({ Lesson }) => {
  return createFindDataLoader(Lesson);
};
