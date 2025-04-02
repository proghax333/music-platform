import bcrypt from "bcrypt";

export const SALT_ROUNDS = 10;

export class AuthService {
  /** @type {import("mongoose").Model} */
  Profile;
  /** @type {import("mongoose").Model} */
  User;

  constructor(Profile, User) {
    this.Profile = Profile;
    this.User = User;
  }

  async signup({ username, email, password, name }) {
    const passwordHash = await this.hashPassword(password);

    const user = await this.User.create({
      username,
      email,
      passwordHash,
    });

    const profile = await this.Profile.create({
      userId: user._id,
      name,
    });

    const userObject = user.toObject();
    delete userObject.passwordHash;

    return userObject;
  }

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }
}
