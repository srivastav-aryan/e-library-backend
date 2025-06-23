import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
      },
      authorId: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
      },

      authorName: {
         type: String,
         required: true,
      },

      genere: {
         type: String,
         required: true,
      },

      coverImage: {
         type: String,
         required: true,
      },

      file: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Books = mongoose.model("Book", bookSchema);

export default Books;
