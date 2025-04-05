import express from "express";

export class AuthRouter {
  /** @type {import("./auth.controller").AuthController} */
  authController;

  constructor(authController) {
    this.authController = authController;
  }

  static get deps() {
    return ["authController"];
  }

  build() {
    const router = express.Router();

    router
      .post("/login", ...this.authController["/login"])
      .post("/signup", ...this.authController["/signup"])
      .post("/refresh-token", ...this.authController["/refresh-token"]);

    return router;
  }
}
