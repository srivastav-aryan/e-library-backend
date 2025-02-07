import express from "express";
import { createBooks } from "./bookControllers.mjs";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookRouter = express.Router();
const uploadFile = multer({
   dest: path.resolve(__dirname, "../../public/data/uploads"),
   limits: { fileSize: 10 * 1024 * 1024 },
});

bookRouter.post(
   "/",
   uploadFile.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "file", maxCount: 1 },
   ]),
   createBooks
);

export { bookRouter };
