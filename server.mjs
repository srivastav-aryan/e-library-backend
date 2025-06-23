import app from "./src/app.mjs";
import { conf } from "./src/config/config.mjs";
import connectDb from "./src/config/dbconfig.mjs";

const startServer = async () => {
   await connectDb();

   const port = conf.port || 8000;

   const server = app.listen(port,  () =>
      console.log(`Server Listening on the port: ${port}`)
   );

   process.on("SIGINT", () => {
      server.close(() => {
         console.log("Server closed");
         process.exit(0);
      });
   });
};

startServer();
