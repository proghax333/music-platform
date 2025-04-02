import { createProfileModel } from "./profile.model.js";

export class ProfileModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerProfileModule(di) {
    di.factory("Profile", createProfileModel);

    return di;
  }
}
