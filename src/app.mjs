import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.mjs";
import userRouter from "./User/userRouter.mjs";
import passport from "passport";

const app = express();
app.use(express.json());
// app.use(express.urlencoded)
app.use(passport.initialize());

app.get("/", (req, res) => {
   res.json({ message: "this is home page" });
});

// ----- User router api endpoint---
app.use("/api/users", userRouter);

// ----global error handling----
app.use(globalErrorHandler);

export default app;
