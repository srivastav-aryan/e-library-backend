import { config } from "dotenv";
config();

const _conf = {
   port: process.env.PORT,
   dbString: process.env.MONGO_CONNECTION_STRING,
   env: process.env.NODE_ENV,
   jwt_secret: process.env.JWT_SECRET,
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   cloud_api_key: process.env.CLOUDINARY_API_KEY,
   cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
   frontEndServer: process.env.FRONTEND_DEV_SERVER
};

export const conf = Object.freeze(_conf);
