import dotenv from "dotenv";

export class EnvModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerEnvModule(di) {
    dotenv.config();
    di.constant("env", process.env);
  }
}
