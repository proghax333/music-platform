import { createHttpError } from "../../lib/http.js";
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

  createFile = resolver(async (parent, args, context) => {
    if (!context.user?._id) {
      throw new Error("Not logged in.");
    }

    const data = args.input;
    data.uploader = context.user._id;

    const file = await this.File.create({
      ...data,
    });

    return {
      message: "File created successfully",
      file,
    };
  });

  updateFile = resolver(async (parent, args, context) => {
    if (!context.user?._id) {
      throw new Error("Not logged in.");
    }
    const data = args.input;

    const file = await this.File.findByIdAndUpdate(args.id, {
      ...data,
    });

    if (!file) {
      throw createHttpError(404, "File not found.");
    }

    return {
      message: "File updated successfully",
      file,
    };
  });

  deleteFile = resolver(async (parent, args, context) => {
    if (!context.user?._id) {
      throw new Error("Not logged in.");
    }
    const file = await this.File.findByIdAndDelete(args.id);

    if (!file) {
      throw createHttpError(404, "File not found.");
    }

    return {
      message: "File deleted successfully",
    };
  });

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
      Mutation: {
        createFile: this.createFile,
        updateFile: this.updateFile,
        deleteFile: this.deleteFile,
      },
      File: {
        uploader: this.File_uploader,
      },
    };
  }
}
