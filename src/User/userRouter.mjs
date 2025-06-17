import express from "express";
import { createUser, loginUser } from "./userController.mjs";
import { checkSchema } from "express-validator";
import validatorSchema from "../expressValidator/userRegisterSchema.mjs";
import loginSchema from "../expressValidator/userLoginSchema.mjs";
import passport from "../config/passportLocal-config.mjs";
import createHttpError from "http-errors";

const userRouter = express.Router();

userRouter.post("/register", checkSchema(validatorSchema), createUser);
userRouter.post(
   "/login",
   (req, res, next) => {
      passport.authenticate("local", { session: false }, (err, user, info) => {
         if (err) return next(createHttpError(500, err));

         if (!user) return next(createHttpError(401, info));

         req.user = user;
         next();
      })(req, res, next);
   },
   checkSchema(loginSchema),
   loginUser
);

export default userRouter;
