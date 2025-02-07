import cloudinary from "../config/cloudinary.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";
import createHttpError from "http-errors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createBooks = async (req, res, next) => {
   try {
      const coverImageMimeType = req.files.coverImage[0].mimetype
         .split("/")
         .at(-1);
      const fileName = req.files.coverImage[0].filename;

      const filePath = path.resolve(
         __dirname,
         "../../public/data/uploads",
         fileName
      );

      const uploader = await cloudinary.uploader.upload(filePath, {
         filename_override: fileName,
         folder: "books-cover",
         format: coverImageMimeType,
      });

      const pdfName = req.files.file[0].filename;
      const pdfPath = path.resolve(
         __dirname,
         "../../public/data/uploads",
         pdfName
      );

      const pdfUploader = await cloudinary.uploader.upload(pdfPath, {
         resource_type: "raw",
         folder: "books-pdf",
         format: "pdf",
      });

      return res.send("odne");
   } catch (error) {
      console.error(error);
      return next(
         createHttpError(500, "server Error occuered while uploading files")
      );
   }
};

export { createBooks };
