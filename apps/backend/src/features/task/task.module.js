import { createTaskModel } from "./task.model.js";
import { TaskResolver } from "./task.resolver.js";

export class TaskModule {
  /**
   * Registers Task services in the DI container.
   * @param {import("bottlejs")} di
   */
  static async register(di) {
    di.factory("Task", createTaskModel);

    di.service("taskResolver", TaskResolver);
    return di;
  }
}
