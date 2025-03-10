import cloudinary from "../config/cloudinary.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs/promises";
import createHttpError from "http-errors";
import Books from "./bookModel.mjs";
import { validationResult } from "express-validator";
import { log } from "node:console";

// -----setup __dirname and __filename for es module-----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------Allowed mimetypes for file uploads-----
const allowedMimeTypes = {
   coverImage: ["image/jpeg", "image/png", "image/gif"],
   file: ["application/pdf"],
};

// --------Utility function for uploading file to cloudinary-------
const uploadFileToCloudinary = async (file, folder, format) => {
   const filePath = path.resolve(
      __dirname,
      "../../public/data/uploads/",
      file.filename
   );
   const uploader = await cloudinary.uploader.upload(filePath, {
      filename_override: file.filename,
      folder,
      format,
   });

   return uploader;
};

// ---------Controllers----------
const createBooks = async (req, res, next) => {
   try {
      const result = validationResult(req);

      if (!result.isEmpty()) {
         return next(createHttpError(400, result.errors[0].msg));
      }
      if (!req.files || !req.files.coverImage || !req.files.file) {
         return next(createHttpError(400, "please upload all the files"));
      }

      // console.log(req.files);

      const coverImage = req.files.coverImage[0];
      const pdfFile = req.files.file[0];

      const coverImageFormat = coverImage.mimetype;
      const pdfFileFormat = pdfFile.mimetype;

      if (
         !allowedMimeTypes.coverImage.includes(coverImageFormat) ||
         !allowedMimeTypes.file.includes(pdfFileFormat)
      ) {
         return next(createHttpError(400, "file format NOT supported"));
      }

      const coverResult = await uploadFileToCloudinary(
         coverImage,
         "books-cover",
         coverImageFormat.split("/").at(-1)
      );

      const pdfResult = await uploadFileToCloudinary(
         pdfFile,
         "books-pdf",
         pdfFileFormat.split("/").at(-1)
      );

      const newBook = await Books.create({
         title: req.body.title,
         genere: req.body.genere,
         author: req.user._id,
         coverImage: coverResult.secure_url,
         file: pdfResult.secure_url,
      });

      await fs.unlink(
         path.resolve(
            __dirname,
            "../../public/data/uploads/",
            coverImage.filename
         )
      );
      await fs.unlink(
         path.resolve(__dirname, "../../public/data/uploads/", pdfFile.filename)
      );

      res.status(201).json({ id: newBook._id });
   } catch (error) {
      console.error("uploading error", error);
      return next(createHttpError(500, error));
   }
};

const updateBooks = async (req, res, next) => {
   try {
      const { title, genere } = req.body;

      const bookId = req.params.bookId;

      const book = await Books.findOne({ _id: bookId });
      if (!book) {
         return next(createHttpError(400, "No such book here"));
      }

      if (book.author.toString() !== req.user._id.toString()) {
         return next(
            createHttpError(403, "UNAUTHORIZED, you cannot update this book")
         );
      }

      const coverImage = req.files.coverImage[0];
      const pdfFile = req.files.file[0];

      const coverImgFormat = coverImage.mimetype;
      const pdfFileFormat = pdfFile.mimetype;

      if (
         !allowedMimeTypes.coverImage.includes(coverImgFormat) ||
         !allowedMimeTypes.file.includes(pdfFileFormat)
      ) {
         return next(createHttpError(400, "file format NOT supported"));
      }

      const coverImageResult = await uploadFileToCloudinary(
         coverImage,
         "books-cover",
         coverImgFormat.split("/").at(-1)
      );

      await fs.unlink(
         path.resolve(
            __dirname,
            "../../public/data/uploads/",
            coverImage.filename
         )
      );

      const pdfResult = await uploadFileToCloudinary(
         pdfFile,
         "books-pdf",
         pdfFileFormat.split("/").at(-1)
      );

      await fs.unlink(
         path.resolve(__dirname, "../../public/data/uploads/", pdfFile.filename)
      );

      const updatedBook = await Books.findOneAndUpdate(
         { _id: bookId },
         {
            title: title,
            genere: genere,
            coverImage: coverImageResult.secure_url,
            file: pdfResult.secure_url,
         },
         { new: true }
      );
      res.json(updatedBook);
   } catch (error) {
      return next(createHttpError(500, `serverError ${error}`));
   }
};

export { createBooks, updateBooks };
