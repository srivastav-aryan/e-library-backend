import express from "express";
// import { conf } from "../config/config.mjs";
import globalErrorHandler from "./middlewares/globalErrorHandler.mjs";

const app = express();

app.get("/", (req, res) => {
   res.json({ message: "this is home page" });
});

// ----global error handling----
app.use(globalErrorHandler);

export default app;
