import { validationResult } from "express-validator";
import createHttpError from "http-errors";

const createUser = (req, res, next) => {
   const result = validationResult(req);

   if (!result.isEmpty()) {
      const cutomError = createHttpError(400, result.errors[0].msg);
      return next(cutomError);
   }

   return res.json({ message: "done" });
};

export { createUser };
