import express from "express";
import { createUser } from "./userController.mjs";

const userRouter = express.Router();

userRouter.post("/register", createUser);

export default userRouter;
