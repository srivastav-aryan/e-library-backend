import express from "express";
import {
   createBooks,
   readBooks,
   updateBooks,
   readOneBook,
   deleteBooks,
} from "./bookControllers.mjs";
import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkSchema } from "express-validator";
import bookSchema from "../expressValidator/bookCreationSchema.mjs";
import passport from "../config/passportjwt-config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bookRouter = express.Router();
const uploadFile = multer({
   dest: path.resolve(__dirname, "../../public/data/uploads"),
   limits: { fileSize: 10 * 1024 * 1024 },
});

bookRouter.post(
   "/",
   passport.authenticate("jwt", { session: false }),
   uploadFile.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "file", maxCount: 1 },
   ]),
   checkSchema(bookSchema),
   createBooks
);

bookRouter.patch(
   "/:bookId",
   passport.authenticate("jwt", { session: false }),
   uploadFile.fields([
      { name: "coverImage", maxCount: 1 },
      { name: "file", maxCount: 1 },
   ]),
   updateBooks
);

bookRouter.get("/", readBooks);

bookRouter.get("/:bookId", readOneBook);

bookRouter.delete(
   "/:bookId",
   passport.authenticate("jwt", { session: false }),
   deleteBooks
);
export { bookRouter };
