import { createProfileModel } from "./profile.model.js";
import { ProfileService } from "./profile.service.js";
import { ProfileResolver } from "./profile.resolver.js";

export class ProfileModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerProfileModule(di) {
    di.factory("Profile", createProfileModel);
    di.service("profileService", ProfileService, "Profile");
    di.lazyService("profileResolver", ProfileResolver, {
      deps: ProfileResolver.deps,
      lazyDeps: ProfileResolver.lazyDeps,
    });

    return di;
  }
}
