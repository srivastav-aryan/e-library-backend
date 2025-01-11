import express from "express";

const app = express();

app.get("/", (req, res) => {
   res.json({ message: "this is home page" });
});

export default app;
