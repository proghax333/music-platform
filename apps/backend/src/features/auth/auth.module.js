import { AuthResolver } from "./auth.resolver.js";
import { AuthService } from "./auth.service.js";

export class AuthModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerAuthModule(di) {
    di.service("authService", AuthService);
    di.service("authResolver", AuthResolver);

    return di;
  }
}
