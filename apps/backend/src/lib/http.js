import createHttpErrorLib from "http-errors";

export function createHttpError(...args) {
  return createHttpErrorLib(...args);
}

export function sendHttpResponse(res, status = 200, data = {}) {
  status = status || 200;

  return res.status(status).json({
    status,
    ...data,
  });
}
