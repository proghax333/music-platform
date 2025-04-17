import multer from "multer";
import path from "node:path";

export class FileController {
  /** @type {import("mongoose").Model} */
  File;

  /** @type {import("dataloader")} */
  FileDataLoader;

  /** @type {import("express").Handler} */
  authMiddleware;

  constructor() {}

  static get deps() {
    return ["File", "FileDataLoader", "authMiddleware"];
  }

  uploadDir = path.resolve("./files");

  // Multer config
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, this.uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  upload = multer({ storage: this.storage });

  // Single file upload
  uploadSingle = () => [
    this.authMiddleware,
    this.upload.single("file"),
    async (req, res) => {
      try {
        if (!req.file)
          return res.status(400).json({ error: "No file uploaded" });

        const file = await this.File.create({
          name: req.file.originalname,
          size: req.file.size,
          type: req.file.mimetype,
          url: `/uploads/${req.file.filename}`,
          uploader: req.user._id,
        });

        res.status(201).json(file);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "File upload failed" });
      }
    },
  ];

  uploadMultiple = () => [
    this.authMiddleware,
    this.upload.array("files", 10),
    async (req, res) => {
      try {
        if (!req.files || req.files.length === 0)
          return res.status(400).json({ error: "No files uploaded" });

        const fileDocs = await Promise.all(
          req.files.map((file) =>
            this.File.create({
              name: file.originalname,
              size: file.size,
              type: file.mimetype,
              url: `/uploads/${file.filename}`,
              uploader: req.user._id,
            })
          )
        );

        res.status(201).json(fileDocs);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Multiple file upload failed" });
      }
    },
  ];
}
