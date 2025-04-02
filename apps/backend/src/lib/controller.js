import express from "express";

/**
 * Wraps an asynchronous route handler to catch errors and pass them to the next middleware.
 *
 * @param {(req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>} fn - The async route handler function.
 * @returns {(req: express.Request, res: express.Response, next: express.NextFunction) => void} A middleware function that handles errors.
 */
export function controller(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.log(err);
      next(err);
    });
  };
}
