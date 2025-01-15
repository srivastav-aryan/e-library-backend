import { config } from "dotenv";
config();

const _conf = {
   port: process.env.PORT,
   dbString: process.env.MONGO_CONNECTION_STRING,
   env: process.env.NODE_ENV,
};

export const conf = Object.freeze(_conf);
