import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler.mjs";
import userRouter from "./User/userRouter.mjs";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
   res.json({ message: "this is home page" });
});

// ----- User routers---
app.use("/api/users", userRouter);

// ----global error handling----
app.use(globalErrorHandler);

export default app;
