import {
  createCourseDataLoader,
  createCourseModel,
  createLessonDataLoader,
  createLessonModel,
  createSectionDataLoader,
  createSectionModel,
} from "./course.model.js";
import { CourseResolver } from "./course.resolver.js";

export class CourseModule {
  /**
   * Registers services in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async register(di) {
    di.factory("Course", createCourseModel);
    di.factory("Section", createSectionModel);
    di.factory("Lesson", createLessonModel);

    di.factory("CourseDataLoader", createCourseDataLoader);
    di.factory("SectionDataLoader", createSectionDataLoader);
    di.factory("LessonDataLoader", createLessonDataLoader);

    di.service("courseResolver", CourseResolver);
  }
}
