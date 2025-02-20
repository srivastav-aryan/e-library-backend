import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import Users from "./userModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { conf } from "../config/config.mjs";

const createUser = async (req, res, next) => {
   const result = validationResult(req);

   const { name, email, password } = req.body;

   if (!result.isEmpty()) {
      const customError = createHttpError(400, result.errors[0].msg);
      return next(customError);
   }

   try {
      const alreadyExistingUser = await Users.findOne({ email: email });

      if (alreadyExistingUser) {
         return next(
            createHttpError(
               409,
               "Email Already in use sorry try with new email"
            )
         );
      }
   } catch (error) {
      return next(createHttpError(500, `DB querry error: ${error}`));
   }

   try {
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
   } catch (error) {
      return next(createHttpError(500, `Saving user error: ${error}`));
   }
};

const loginUser = async (req, res, next) => {
   const result = validationResult(req);

   if (!result.isEmpty()) {
      const customError = createHttpError(400, result.errors[0].msg);
      return next(customError);
   }

   const payload = { sub: req.user._id };
   const token = jwt.sign(payload, conf.jwt_secret, {
      expiresIn: "7d",
   });
   return res.status(200).json({ authToken: token });
};

export { createUser, loginUser };
