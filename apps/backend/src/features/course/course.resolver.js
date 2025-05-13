import { resolver } from "../../lib/graphql.js";
import { createHttpError } from "../../lib/http.js";
import { paginate } from "../../lib/pagination.js";

export class CourseResolver {
  /** @type {import("mongoose").Model} */
  Course;
  /** @type {import("mongoose").Model} */
  Section;
  /** @type {import("mongoose").Model} */
  Lesson;
  /** @type {import("mongoose").Model} */
  Profile;
  /** @type {import("mongoose").Model} */
  File;

  /** @type {import("dataloader")} */
  CourseDataLoader;
  /** @type {import("dataloader")} */
  SectionDataLoader;
  /** @type {import("dataloader")} */
  LessonDataLoader;

  constructor() {}

  static get deps() {
    return [
      "Course",
      "Section",
      "Lesson",
      "Profile",
      "File",

      "CourseDataLoader",
      "SectionDataLoader",
      "LessonDataLoader",
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

  courses = async (parent, args, context) => {
    const pipeline = this.Course.aggregate();

    const page = await paginate(pipeline, args);
    return page;
  };

  Course_instructors = async (parent, args, context) => {
    if (!parent.instructors || parent.instructors.length === 0) {
      return [];
    }

    const result = await this.Profile.find({
      _id: {
        $in: parent.instructors,
      },
    });

    return result;
  };

  Course_images = async (parent, args, context) => {
    if (!parent.images || parent.images.length === 0) {
      return [];
    }

    const result = await this.File.find({
      _id: {
        $in: parent.images,
      },
    });

    return result;
  };

  Course_sections = async (parent, args, context) => {
    if (!parent.sections || parent.sections.length === 0) {
      return [];
    }

    const result = await this.Section.find({
      _id: {
        $in: parent.sections,
      },
    });

    return result;
  };

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
      },
    };
  };
}
