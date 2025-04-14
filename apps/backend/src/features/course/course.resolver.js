import { resolver } from "../../lib/graphql.js";
import { createHttpError } from "../../lib/http.js";

export class CourseResolver {
  /** @type {import("mongoose").Model} */
  Course;
  /** @type {import("mongoose").Model} */
  Section;
  /** @type {import("mongoose").Model} */
  Lesson;
  /** @type {import("mongoose").Model} */
  Quiz;
  /** @type {import("mongoose").Model} */
  QuizAttempt;

  /** @type {import("dataloader")} */
  CourseDataLoader;
  /** @type {import("dataloader")} */
  SectionDataLoader;
  /** @type {import("dataloader")} */
  LessonDataLoader;
  /** @type {import("dataloader")} */
  QuizDataLoader;
  /** @type {import("dataloader")} */
  QuizAttemptDataLoader;

  constructor() {}

  static get deps() {
    return [
      "Course",
      "Section",
      "Lesson",
      "Quiz",
      "QuizAttempt",

      "CourseDataLoader",
      "SectionDataLoader",
      "LessonDataLoader",
      "QuizDataLoader",
      "QuizAttemptDataLoader",
    ];
  }

  createCourse = resolver(async (parent, args, context) => {
    const data = args.input;
    const course = await this.Course.create(data);
    return course;
  });

  updateCourse = resolver(async (parent, args, context) => {
    const data = args.input;
    const course = await this.Course.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!course) {
      throw createHttpError("Course not found.");
    }

    return course;
  });

  deleteCourse = resolver(async (parent, args, context) => {
    const data = args.input;
    const course = await this.Course.findByIdAndDelete(args.id, data, {
      new: true,
    });

    if (!course) {
      throw createHttpError("Course not found.");
    }
    return course;
  });

  // Section
  createSection = resolver(async (parent, args, context) => {
    const data = args.input;
    const section = await this.Section.create(data);
    return section;
  });

  updateSection = resolver(async (parent, args, context) => {
    const data = args.input;
    const section = await this.Section.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!section) {
      throw createHttpError("Section not found.");
    }

    return section;
  });

  deleteSection = resolver(async (parent, args, context) => {
    const data = args.input;
    const section = await this.Section.findByIdAndDelete(args.id, data, {
      new: true,
    });

    if (!section) {
      throw createHttpError("Section not found.");
    }
    return section;
  });

  // Lesson
  createLesson = resolver(async (parent, args, context) => {
    const data = args.input;
    const lesson = await this.Lesson.create(data);
    return lesson;
  });

  updateLesson = resolver(async (parent, args, context) => {
    const data = args.input;
    const lesson = await this.Lesson.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!lesson) {
      throw createHttpError("Lesson not found.");
    }

    return lesson;
  });

  deleteLesson = resolver(async (parent, args, context) => {
    const data = args.input;
    const lesson = await this.Lesson.findByIdAndDelete(args.id, data, {
      new: true,
    });

    if (!lesson) {
      throw createHttpError("Lesson not found.");
    }
    return lesson;
  });

  // Quiz
  createQuiz = resolver(async (parent, args, context) => {
    const data = args.input;
    const quiz = await this.Quiz.create(data);
    return quiz;
  });

  updateQuiz = resolver(async (parent, args, context) => {
    const data = args.input;
    const quiz = await this.Quiz.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!quiz) {
      throw createHttpError("Quiz not found.");
    }

    return quiz;
  });

  deleteQuiz = resolver(async (parent, args, context) => {
    const data = args.input;
    const quiz = await this.Quiz.findByIdAndDelete(args.id, data, {
      new: true,
    });

    if (!quiz) {
      throw createHttpError("Quiz not found.");
    }
    return quiz;
  });

  // Quiz
  createQuizAttempt = resolver(async (parent, args, context) => {
    const data = args.input;
    const quizAttempt = await this.QuizAttempt.create(data);
    return quizAttempt;
  });

  updateQuizAttempt = resolver(async (parent, args, context) => {
    const data = args.input;
    const quizAttempt = await this.QuizAttempt.findByIdAndUpdate(
      args.id,
      data,
      {
        new: true,
      }
    );

    if (!quizAttempt) {
      throw createHttpError("Quiz attempt not found.");
    }

    return quizAttempt;
  });

  deleteQuizAttempt = resolver(async (parent, args, context) => {
    const data = args.input;
    const quizAttempt = await this.QuizAttempt.findByIdAndDelete(
      args.id,
      data,
      {
        new: true,
      }
    );

    if (!quizAttempt) {
      throw createHttpError("Quiz attempt not found.");
    }
    return quizAttempt;
  });

  getResolvers = () => {
    return {
      Mutation: {
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,

        createSection: this.createSection,
        updateSection: this.updateSection,
        updateSection: this.deleteSection,

        createLesson: this.createLesson,
        updateLesson: this.updateLesson,
        updateLesson: this.deleteLesson,

        createQuiz: this.createQuiz,
        updateQuiz: this.updateQuiz,
        deleteQuiz: this.deleteQuiz,

        createQuizAttempt: this.createQuizAttempt,
        updateQuizAttempt: this.updateQuizAttempt,
        deleteQuizAttempt: this.deleteQuizAttempt,
      },
    };
  };
}
