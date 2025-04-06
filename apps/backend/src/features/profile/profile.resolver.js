import { resolver } from "../../lib/graphql.js";
import { ProfileService } from "./profile.service.js";

export class ProfileResolver {
  /** @type {ProfileService} */
  profileService;

  constructor(profileService, userService) {
    this.profileService = profileService;
    this.userService = userService;
  }

  static get deps() {
    return ["profileService", "userService"];
  }

  static get lazyDeps() {
    return ["userResolver"];
  }

  profile = resolver(async (parent, args, context) => {
    let { id } = args;
    if (!id) {
      id = parent.profile;
    }

    const profile = await this.profileService.getProfile(id);
    if (!profile) {
      throw createHttpError(404, "Profile not found.");
    }

    return profile;
  });

  getResolvers = () => {
    return {
      Query: {
        profile: this.profile,
      },

      Profile: {
        user: this.userResolver._User,
      },
    };
  };
}
