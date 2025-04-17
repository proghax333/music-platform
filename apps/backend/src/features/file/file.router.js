import express from "express";

export function createFileRouter({ fileController }) {
  const router = express.Router();

  router.post("/upload", ...fileController.uploadSingle());
  router.post("/upload-multiple", ...fileController.uploadMultiple());

  return router;
}
