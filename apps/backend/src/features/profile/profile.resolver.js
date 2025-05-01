import { createHttpError } from "../../lib/http.js";

export class ProfileResolver {
  /** @type {import("./profile.service.js").ProfileService} */
  profileService;
  /** @type {import("../user/user.service.js").UserService} */
  profileService;
  /** @type {import("dataloader")} */
  UserDataLoader;
  /** @type {import("dataloader")} */
  ProfileDataLoader;

  constructor() {}

  static get deps() {
    return [
      "profileService",
      "userService",

      "UserDataLoader",
      "ProfileDataLoader",

      "File",
    ];
  }

  static get lazyDeps() {
    return ["userResolver"];
  }

  profile = async (parent, args, context) => {
    let { id } = args;
    if (!id) {
      id = parent.profile;
    }

    const profile = await this.ProfileDataLoader.load(id);
    if (!profile) {
      throw createHttpError(404, "Profile not found.");
    }

    return profile;
  };

  Profile_user = async (parent, args, context) => {
    const user = await this.UserDataLoader.load(parent.user);
    return user;
  };

  Profile_avatar = async (parent, args, context) => {
    const result = await this.File.findOne({
      _id: parent.avatar,
    });

    return result;
  };

  getResolvers = () => {
    return {
      Query: {
        profile: this.profile,
      },

      Profile: {
        user: this.Profile_user,
        avatar: this.Profile_avatar,
      },
    };
  };
}
