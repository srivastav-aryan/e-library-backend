const bookSchema = {
   title: {
      in: ["body"],
      isString: true,
      notEmpty: {
         errorMessage: "Title is required and should be valid",
      },
      trim: true,
   },

   genere: {
      in: ["body"],
      isString: true,
      notEmpty: {
         errorMessage: "The genere of the book must be provided",
      },
      trim: true,
   },
   authorId: {
      in: ["body"],
      isMongoId: { errorMessage: "Author must be a valid User ID" },
      notEmpty: { errorMessage: "Author is required" },
   },
   authorName: {
      in: ["body"],
      isString: true,
      notEmpty: {
         errorMessage: "Author name is required and should be valid",
      },
      trim: true,
   },
};

export default bookSchema;
