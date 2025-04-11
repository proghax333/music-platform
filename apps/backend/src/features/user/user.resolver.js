import { createHttpError } from "../../lib/http.js";

export class UserResolver {
  /** @type {import("./user.service").UserService} */
  userService;
  /** @type {import("../profile/profile.service").ProfileService} */
  profileService;
  /** @type {import("dataloader")} */
  ProfileDataLoader;
  /** @type {import("dataloader")} */
  UserDataLoader;

  constructor() {}

  static get deps() {
    return [
      "userService",
      "profileService",
      "ProfileDataLoader",
      "UserDataLoader",
    ];
  }

  static get lazyDeps() {
    return ["profileResolver"];
  }

  User_profiles = async (parent, args, context) => {
    const result = [];

    for (const p of parent.profiles) {
      const profile = await this.ProfileDataLoader.load(p);
      if (!profile) {
        throw createHttpError(404, "Profile not found.");
      }
      result.push(profile);
    }

    return result;
  };

  me = async (parent, args, context) => {
    if (!context.user) {
      throw createHttpError(401, "Unauthorized.");
    }

    const user = await this.UserDataLoader.load(context.user._id);
    if (!user) {
      throw createHttpError(404, "User not found.");
    }
    return user;
  };

  getResolvers = () => {
    return {
      User: {
        profiles: this.User_profiles,
      },
      Query: {
        me: this.me,
      },
    };
  };
}
