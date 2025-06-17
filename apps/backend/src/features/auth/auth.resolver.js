import { resolver } from "../../lib/graphql.js";
import { AuthService } from "./auth.service.js";

export class AuthResolver {
  /** @type {AuthService} */
  authService;

  constructor() {}

  static get deps() {
    return ["authService"];
  }

  signup = resolver(async (parent, args, context) => {
    const { name, username, email, password } = args.input;
    const result = await this.authService.signup({
      username,
      email,
      password,
      name,
    });

    return {
      message: "Signed up successfully",
      user: result,
    };
  });

  login = resolver(async (parent, args, context) => {
    const { username, password } = args.input;
    const { user, accessToken, refreshToken } = await this.authService.login(
      username,
      password
    );

    const { res } = context;
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 15, // 15 minutes
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 15 minutes
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    return {
      message: "Logged in successfully",
      user,
      accessToken,
      refreshToken,
    };
  });

  logout = resolver(async (parent, args, context) => {
    const { res } = context;

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return {
      message: "Logged out successfully",
    };
  });

  refreshToken = resolver(async (parent, args, context) => {
    const refreshTokenFromCookie = context.req.cookies.refreshToken;

    const { refreshToken } = refreshTokenFromCookie || args.input;
    const accessToken = this.authService.refreshAccessToken(refreshToken);

    return {
      accessToken,
    };
  });

  getResolvers = () => {
    return {
      Mutation: {
        signup: this.signup,
        login: this.login,
        logout: this.logout,
        refreshToken: this.refreshToken,
      },
    };
  };
}
