import app from "./src/app.mjs";

const startServer = () => {
   const port = process.env.PORT || 8000;

   app.listen(port, () => console.log(`Server Listening on port: ${port}`));
};

startServer();
