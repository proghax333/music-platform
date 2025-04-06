export class UserResolver {
  /** @type {import("./user.service").UserService} */
  userService;

  constructor(userService, User) {
    this.userService = userService;
  }

  static get deps() {
    return ["userService"];
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

  getResolvers = () => {
    return {};
  };
}
