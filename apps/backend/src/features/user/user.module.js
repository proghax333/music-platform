import { createUserModel } from "./user.model.js";

export class UserModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerUserModule(di) {
    di.factory("User", createUserModel);

    return di;
  }
}
