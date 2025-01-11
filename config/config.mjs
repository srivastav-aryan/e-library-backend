import { config } from "dotenv";
config();

const _conf = {
   port: process.env.PORT,
};

export const conf = Object.freeze(_conf);
