import app from "./src/app.mjs";
import { conf } from "./config/config.mjs";

const startServer = () => {
   const port = conf.port || 8000;

   app.listen(port, () => console.log(`Server Listening on port: ${port}`));
};

startServer();
