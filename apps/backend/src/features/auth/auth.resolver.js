import { resolver } from "../../lib/graphql.js";
import { AuthService } from "./auth.service.js";

export class AuthResolver {
  /** @type {AuthService} */
  authService;

  constructor(authService) {
    this.authService = authService;
  }

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

    return {
      message: "Logged in successfully",
      user,
      accessToken,
      refreshToken,
    };
  });

  refreshToken = resolver(async (parent, args, context) => {
    const { refreshToken } = args.input;
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
        refreshToken: this.refreshToken,
      },
    };
  };
}
