const validatorSchema = {
   name: {
      in: ["body"],
      isString: {
         errorMessage: "Name must be a string",
      },
      notEmpty: {
         errorMessage: "Name is required",
      },
   },
   email: {
      in: ["body"],
      isEmail: {
         errorMessage: "Email must be a valid email address",
      },
      normalizeEmail: true,
      notEmpty: {
         errorMessage: "Email is required and should be valid",
      },
   },

   password: {
      in: ["body"],
      isLength: {
         options: { min: 4 },
         errorMessage: "Password must be at least 4 characters long",
      },
      notEmpty: {
         errorMessage: "Password is required",
      },
   },
};

export default validatorSchema;
