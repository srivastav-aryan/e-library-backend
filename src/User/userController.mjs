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
   const { email, password } = req.body;

   try {
      const user = await Users.findOne({ email });
      if (!user) return next(createHttpError(401, `invalid email`));

      const passwordValid = await bcrypt.compare(password, user.password);
      if (!passwordValid) return next(createHttpError(401, "invalid passwrod"));
      const token = jwt.sign({ sub: user._id }, process.env.jwt_secret, {
         expiresIn: "7d",
      });

      res.status(200).json({ accessToken: token });
   } catch (error) {
      console.log(`server failiure:- ${error}`);
      return next(createHttpError(500, error));
   }
};

export { createUser, loginUser };
