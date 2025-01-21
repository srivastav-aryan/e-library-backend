import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import Users from "./userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { conf } from "../config/config.mjs";

const createUser = async (req, res, next) => {
   try {
      const result = validationResult(req);

      const { name, email, password } = req.body;

      if (!result.isEmpty()) {
         const customError = createHttpError(400, result.errors[0].msg);
         return next(customError);
      }

      const alreadyExistingUser = await Users.findOne({ email: email });

      if (alreadyExistingUser) {
         return next(
            createHttpError(
               409,
               "Email Already in use sorry try with new email"
            )
         );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new Users({
         name,
         email,
         password: hashedPassword,
      });
      await newUser.save();

      const token = jwt.sign({ sub: newUser._id }, conf.jwt_secret, {
         expiresIn: "7d",
      });

      res.status(200).json({ accessToken: token });
   } catch (e) {
      const lastError = createHttpError(500, `last registeration error:- ${e}`);
      next(lastError);
   }
};

export { createUser };
