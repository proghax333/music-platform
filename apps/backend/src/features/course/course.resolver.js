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
    return {
      message: "Course created.",
      course,
    };
  });

  updateCourse = resolver(async (parent, args, context) => {
    const data = args.input;
    const course = await this.Course.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!course) {
      throw createHttpError("Course not found.");
    }

    return {
      message: "Course updated.",
      course,
    };
  });

  deleteCourse = resolver(async (parent, args, context) => {
    const course = await this.Course.findByIdAndDelete(args.id);

    if (!course) {
      throw createHttpError("Course not found.");
    }

    return {
      message: "Course deleted.",
    };
  });

  createSection = resolver(async (parent, args, context) => {
    const data = args.input;
    const section = await this.Section.create(data);
    return {
      message: "Section created.",
      section,
    };
  });

  updateSection = resolver(async (parent, args, context) => {
    const data = args.input;
    const section = await this.Section.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!section) {
      throw createHttpError("Section not found.");
    }

    return {
      message: "Section updated.",
      section,
    };
  });

  deleteSection = resolver(async (parent, args, context) => {
    const section = await this.Section.findByIdAndDelete(args.id);

    if (!section) {
      throw createHttpError("Section not found.");
    }

    return {
      message: "Section deleted.",
    };
  });

  createLesson = resolver(async (parent, args, context) => {
    const data = args.input;
    const lesson = await this.Lesson.create(data);
    return {
      message: "Lesson created.",
      lesson,
    };
  });

  updateLesson = resolver(async (parent, args, context) => {
    const data = args.input;
    const lesson = await this.Lesson.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!lesson) {
      throw createHttpError("Lesson not found.");
    }

    return {
      message: "Lesson updated.",
      lesson,
    };
  });

  deleteLesson = resolver(async (parent, args, context) => {
    const lesson = await this.Lesson.findByIdAndDelete(args.id);

    if (!lesson) {
      throw createHttpError("Lesson not found.");
    }

    return {
      message: "Lesson deleted.",
    };
  });

  createQuiz = resolver(async (parent, args, context) => {
    const data = args.input;
    const quiz = await this.Quiz.create(data);
    return {
      message: "Quiz created.",
      quiz,
    };
  });

  updateQuiz = resolver(async (parent, args, context) => {
    const data = args.input;
    const quiz = await this.Quiz.findByIdAndUpdate(args.id, data, {
      new: true,
    });

    if (!quiz) {
      throw createHttpError("Quiz not found.");
    }

    return {
      message: "Quiz updated.",
      quiz,
    };
  });

  deleteQuiz = resolver(async (parent, args, context) => {
    const quiz = await this.Quiz.findByIdAndDelete(args.id);

    if (!quiz) {
      throw createHttpError("Quiz not found.");
    }

    return {
      message: "Quiz deleted.",
    };
  });

  createQuizAttempt = resolver(async (parent, args, context) => {
    const data = args.input;
    const quizAttempt = await this.QuizAttempt.create(data);
    return {
      message: "Quiz attempt created.",
      quizAttempt,
    };
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

    return {
      message: "Quiz attempt updated.",
      quizAttempt,
    };
  });

  deleteQuizAttempt = resolver(async (parent, args, context) => {
    const quizAttempt = await this.QuizAttempt.findByIdAndDelete(args.id);

    if (!quizAttempt) {
      throw createHttpError("Quiz attempt not found.");
    }

    return {
      message: "Quiz attempt deleted.",
    };
  });

  getResolvers = () => {
    return {
      Mutation: {
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse,

        createSection: this.createSection,
        updateSection: this.updateSection,
        deleteSection: this.deleteSection,

        createLesson: this.createLesson,
        updateLesson: this.updateLesson,
        deleteLesson: this.deleteLesson,

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
