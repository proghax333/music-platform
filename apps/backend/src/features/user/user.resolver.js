import { createHttpError } from "../../lib/http.js";

export class UserResolver {
  /** @type {import("./user.service").UserService} */
  userService;

  constructor(userService, profileService) {
    this.userService = userService;
    this.profileService = profileService;
  }

  static get deps() {
    return ["userService", "profileService"];
  }

  static get lazyDeps() {
    return ["profileResolver"];
  }

  _User = async (parent, args, context) => {
    const user = await this.userService.getUserById(parent.user);
    if (!user) {
      throw createHttpError(404, "User not found.");
    }

    return user;
  };

  User_profiles = async (parent, args, context) => {
    const result = [];

    for (const p of parent.profiles) {
      const profile = await this.profileService.getProfile(p);
      if (!profile) {
        throw createHttpError(404, "Profile not found.");
      }
      result.push(profile);
    }

    return result;
  };

  me = async (parent, args, context) => {
    const user = await this.userService.getUserById(context.user._id);
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
