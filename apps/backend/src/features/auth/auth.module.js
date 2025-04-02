import { AuthController } from "./auth.controller.js";
import { AuthRouter } from "./auth.router.js";
import { AuthService } from "./auth.service.js";

export class AuthModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerAuthModule(di) {
    di.service("authService", AuthService, "Profile", "User");
    di.service("authController", AuthController, "authService");
    di.service("authRouter", AuthRouter, "authController");

    return di;
  }
}
