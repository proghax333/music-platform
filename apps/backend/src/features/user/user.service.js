export class UserService {
  /** @type {import("mongoose").Model} */
  User;

  constructor(User) {
    this.User = User;
  }

  static get deps() {
    return ["User"];
  }

  async getUserById(id) {
    const user = await this.User.findById(id);
    return user.toObject();
  }
}
