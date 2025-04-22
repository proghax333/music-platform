import z from "zod";

/**
 * Validation middleware for Zod schemas.
 * @param {import("zod").Schema} schema
 * @param {(req: import("express").Request) => any} selector
 * @param {(error: import("zod").ZodError) => Promise<void> | void} [errorHandler=null] - Optional error handler function.
 * @returns {(req: import("express").Request, res: import("express").Response, next: import("express").NextFunction) => Promise<void>} Middleware function.
 */
export function validate(
  schema,
  selector = (req) => req.body,
  errorHandler = null
) {
  return async (req, res, next) => {
    const selectedData = selector(req);

    const { success, data, error } = schema.safeParse(selectedData);

    if (success) {
      next();
    } else {
      if (errorHandler) await errorHandler(error);
      next(error);
    }
  };
}

export const sortValidationSchema = z.array(z.record(z.number()));

export function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
