import { config } from "dotenv";
config();

const _conf = {
   port: process.env.PORT,
   dbString: process.env.MONGO_CONNECTION_STRING,
};

export const conf = Object.freeze(_conf);
