import express from "express";
import { createUser, loginUser } from "./userController.mjs";
import { checkSchema } from "express-validator";
import validatorSchema from "../expressValidator/userRegisterSchema.mjs";
import loginSchema from "../expressValidator/userLoginSchema.mjs";

const userRouter = express.Router();

userRouter.post("/register", checkSchema(validatorSchema), createUser);
userRouter.post("/login", checkSchema(loginSchema), loginUser);

export default userRouter;
