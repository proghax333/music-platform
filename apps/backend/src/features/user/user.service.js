export class UserService {
  /** @type {import("mongoose").Model} */
  User;

  constructor(User) {
    this.User = User;
  }

  static get deps() {
    return ["User"];
  }

  getUserById(id) {
    return this.User.findById(id).exec();
  }
}
