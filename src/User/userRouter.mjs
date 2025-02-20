import express from "express";
import { createUser, loginUser } from "./userController.mjs";
import { checkSchema } from "express-validator";
import validatorSchema from "../expressValidator/userRegisterSchema.mjs";
import loginSchema from "../expressValidator/userLoginSchema.mjs";
import passport from "../config/passportLocal-config.mjs";

const userRouter = express.Router();

userRouter.post("/register", checkSchema(validatorSchema), createUser);
userRouter.post(
   "/login",
   passport.authenticate("local", { session: false }),
   checkSchema(loginSchema),
   loginUser
);

export default userRouter;
