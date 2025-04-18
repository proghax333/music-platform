import { resolver } from "../../lib/graphql.js";
import { paginate } from "../../lib/pagination.js";

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

  files = async (parent, args, context) => {
    const userId = context.user?._id;

    if (!userId) {
      throw new Error("Not logged in");
    }

    const pipeline = await this.File.aggregate().match({
      uploader: userId,
    });

    const page = await paginate(pipeline, args);
    return page;
  };

  File_uploader = async (parent, args, context) => {
    const result = await this.User.findById(parent.uploader);
    return result;
  };

  getResolvers() {
    return {
      Query: {
        files: this.files,
      },
      File: {
        uploader: this.File_uploader,
      },
    };
  }
}
