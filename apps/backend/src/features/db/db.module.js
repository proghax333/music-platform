import mongoose from "mongoose";

export class DBModule {
  /**
   * Registers a service in the container.
   * @param {import("bottlejs")} di - The unique name of the service.
   */
  static async registerDBModule(di) {
    let db = await createConnection(process.env.MONGODB_URI);

    /**
     * Connects to the MongoDB database using the provided Mongoose connection.
     *
     * @param {import('mongoose').Connection} db - The Mongoose connection instance.
     * @returns {Promise<import('mongoose').Connection>} The connected Mongoose connection.
     */
    async function createConnection(connectionString) {
      const db = mongoose.createConnection();
      const connection = await db.openUri(connectionString);

      return connection;
    }

    di.constant("db", db);
  }
}
