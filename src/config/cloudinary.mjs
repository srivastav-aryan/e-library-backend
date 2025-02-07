import { v2 as cloudinary } from "cloudinary";
import { conf } from "./config.mjs";

cloudinary.config({
   cloud_name: conf.cloud_name,
   api_key: conf.cloud_api_key,
   api_secret: conf.cloud_api_secret, // Click 'View API Keys' above to copy your API secret
});

export default cloudinary;
