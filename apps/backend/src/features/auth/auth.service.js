import bcrypt from "bcrypt";
import { createHttpError } from "../../lib/http.js";
import jwt from "jsonwebtoken";

export const SALT_ROUNDS = 10;

export class AuthService {
  /** @type {import("mongoose").Connection} */
  db;
  /** @type {import("mongoose").Model} */
  Profile;
  /** @type {import("mongoose").Model} */
  User;

  constructor(db, Profile, User) {
    this.db = db;
    this.Profile = Profile;
    this.User = User;
  }

  static get deps() {
    return ["db", "Profile", "User"];
  }

  async signup({ username, email, password, name }) {
    // Check if the user already exists
    const existingUser = await this.User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw createHttpError(409, "User already exists.");
    }

    const passwordHash = await this.hashPassword(password);

    const user = await this.User.create({
      username,
      email,
      passwordHash,
    });

    const profile = await this.Profile.create({
      user: user._id,
      name,
    });

    user.profiles.push(profile._id);
    await user.save();

    const newUser = await this.User.findById(user._id);

    const userObject = newUser.toObject();
    delete userObject.passwordHash;

    return userObject;
  }

  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  }

  async login(username, password) {
    const user = await this.User.findOne({
      $or: [{ username }, { email: username }],
    }).select("+passwordHash");

    if (!user) {
      throw createHttpError(401, "Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw createHttpError(401, "Invalid credentials.");
    }

    const accessToken = this.generateAccessToken(user._id);
    const refreshToken = this.generateRefreshToken(user._id);

    return { user, accessToken, refreshToken };
  }

  generateAccessToken(user) {
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });
    return token;
  }

  generateRefreshToken(user) {
    const token = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return token;
  }

  async verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return decoded.user;
    } catch (error) {
      throw createHttpError(401, "Invalid token.");
    }
  }

  async getUserFromToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return decoded.user;
    } catch (error) {
      throw createHttpError(401, "Invalid token.");
    }
  }

  async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      const user = await this.User.findById(decoded.user._id);

      if (!user) {
        throw createHttpError(401, "Invalid token.");
      }

      const newAccessToken = this.generateAccessToken(user._id);
      return newAccessToken;
    } catch (error) {
      throw createHttpError(401, "Invalid token.");
    }
  }
}
