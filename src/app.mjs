import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.mjs";
import userRouter from "./User/userRouter.mjs";
import passport from "passport";
import { bookRouter } from "./Book/bookRouter.mjs";
import cors from "cors";

const app = express();
app.use(
   cors({
      origin: "http://localhost:3000",
   })
);
app.use(express.json());
// app.use(express.urlencoded);
app.use(passport.initialize());

app.get("/", (req, res) => {
   res.json({ message: "this is home page" });
});

// ----- User router api endpoint---
app.use("/api/users", userRouter);

// ------ book router api endpoint----
app.use("/api/books", bookRouter);

// ----global error handling----
app.use(globalErrorHandler);

export default app;
