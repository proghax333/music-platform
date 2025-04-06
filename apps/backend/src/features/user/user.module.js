import { createUserModel } from "./user.model.js";
import { UserResolver } from "./user.resolver.js";
import { UserService } from "./user.service.js";

export class UserModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerUserModule(di) {
    di.factory("User", createUserModel);
    di.service("userService", UserService, ...UserService.deps);
    di.lazyService("userResolver", UserResolver, {
      deps: UserResolver.deps,
      lazyDeps: UserResolver.lazyDeps,
    });

    return di;
  }
}
