import { resolver } from "../../lib/graphql.js";

export class FileResolver {
  /** @type {import("mongoose").Model} */
  File;
  /** @type {import("mongoose").Model} */
  User;

  /** @type {import("dataloader")} */
  FileDataLoader;

  constructor() {}

  static get deps() {
    return ["File", "User", "FileDataLoader"];
  }

  File_uploader = async (parent, args, context) => {
    const result = await this.User.findById(parent.uploader);
    return result;
  };

  getResolvers() {
    return {
      File: {
        uploader: this.File_uploader,
      },
    };
  }
}
