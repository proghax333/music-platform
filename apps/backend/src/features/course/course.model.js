import { Schema } from "mongoose";

/**
 * Creates and returns the Course model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db - The Mongoose connection to use.
 * @returns {import("mongoose").Model} The Course model.
 */
export const createCourseModel = ({ db }) => {
  const CourseSchema = new Schema(
    {
      title: { type: String, required: true, trim: true },
      description: { type: String },
      instructor: {
        type: Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
      image: { type: String },
      published: { type: Boolean, default: false },
      sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
    },
    { timestamps: true }
  );

  return db.model("Course", CourseSchema);
};

/**
 * Creates and returns the Section model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db - The Mongoose connection to use.
 * @returns {import("mongoose").Model} The Section model.
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
            enum: ["Lesson", "Quiz"],
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

/**
 * Creates and returns the Lesson model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db - The Mongoose connection to use.
 * @returns {import("mongoose").Model} The Lesson model.
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
          url: String,
          type: { type: String, enum: ["pdf", "link", "image", "file"] },
        },
      ],
    },
    { timestamps: true }
  );

  return db.model("Lesson", LessonSchema);
};

/**
 * Creates and returns the Quiz model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db - The Mongoose connection to use.
 * @returns {import("mongoose").Model} The Quiz model.
 */
export const createQuizModel = ({ db }) => {
  const QuestionSchema = new Schema(
    {
      type: {
        type: String,
        enum: [
          "multiple-choice",
          "true-false",
          "fill-in-the-blank",
          "matching",
        ],
        required: true,
      },
      text: { type: String, required: true },
      options: [
        {
          text: String,
          isCorrect: Boolean,
        },
      ],
      correctAnswers: [String],
      matchPairs: [
        {
          left: String,
          right: String,
        },
      ],
      explanation: { type: String },
      points: { type: Number, default: 1 },
    },
    { _id: false }
  );

  const QuizSchema = new Schema(
    {
      title: { type: String, required: true },
      description: { type: String },
      timeLimit: { type: Number },
      randomizeQuestions: { type: Boolean, default: false },
      passingScore: { type: Number },
      questions: [QuestionSchema],
      course: { type: Schema.Types.ObjectId, ref: "Course" },
    },
    { timestamps: true }
  );

  return db.model("Quiz", QuizSchema);
};

/**
 * Creates and returns the QuizAttempt model using the given Mongoose connection.
 *
 * @param {Object} params
 * @param {import("mongoose").Connection} params.db - The Mongoose connection to use.
 * @returns {import("mongoose").Model} The QuizAttempt model.
 */
export const createQuizAttemptModel = ({ db }) => {
  const QuizAttemptSchema = new Schema(
    {
      quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
      user: { type: Schema.Types.ObjectId, ref: "Profile", required: true },
      answers: [
        {
          questionIndex: Number,
          selectedOptions: [String],
          writtenAnswer: String,
          matchedPairs: [{ left: String, right: String }],
          isCorrect: Boolean,
        },
      ],
      score: { type: Number },
      completedAt: { type: Date },
      duration: { type: Number },
    },
    { timestamps: true }
  );

  return db.model("QuizAttempt", QuizAttemptSchema);
};
