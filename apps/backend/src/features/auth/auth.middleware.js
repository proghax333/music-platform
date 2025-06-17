import { controller } from "../../lib/controller.js";
import { createHttpError } from "../../lib/http.js";

export function authMiddleware({ userService, authService }) {
  return controller(async (req, res, next) => {
    let token = req.cookies.accessToken || req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    if (!token) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const isValidToken = await authService.verifyAccessToken(token);
    if (!isValidToken) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const user = await userService.getUserById(isValidToken._id);
    if (!user) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const safeUser = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    req.token = safeUser;
    req.user = safeUser;
    next();
  });
}
