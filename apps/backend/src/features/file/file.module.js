import { FileController } from "./file.controller.js";
import { createFileDataLoader, createFileModel } from "./file.model.js";
import { createFileRouter } from "./file.router.js";

export class FileModule {
  /**
   * Registers services in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerFileModule(di) {
    di.factory("File", createFileModel);

    di.factory("FileDataLoader", createFileDataLoader);

    di.factory("fileRouter", createFileRouter);
    di.service("fileController", FileController);
  }
}
