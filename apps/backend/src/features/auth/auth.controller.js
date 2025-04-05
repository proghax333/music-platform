import { controller } from "../../lib/controller.js";
import { createHttpError, sendHttpResponse } from "../../lib/http.js";

export class AuthController {
  /** @type {import('./auth.service').AuthService} */
  authService;

  constructor(authService) {
    this.authService = authService;
  }

  static get deps() {
    return ["authService"];
  }

  "/login" = [
    controller((req, res, next) => {
      const { username, password } = req.body;

      console.log({ username, password });
      res.send("OK");

      // throw createHttpError(501);
    }),
  ];

  "/signup" = [
    controller(async (req, res, next) => {
      const { username, email, password, name } = req.body;

      const user = await this.authService.signup({
        username,
        email,
        password,
        name,
      });

      sendHttpResponse(res, 200, {
        message: "User created successfully.",
        data: user,
      });
    }),
  ];

  "/refresh-token" = [
    controller((req, res, next) => {
      throw createHttpError(501);
    }),
  ];
}
