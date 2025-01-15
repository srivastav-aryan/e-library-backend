import mongoose from "mongoose";
import { conf } from "./config.mjs";

const connectDb = async () => {
   try {
      mongoose.connection.on("connected", () => {
         console.log("Database connected successfully");
      });

      mongoose.connection.on("error", (err) => {
         console.log(`error event occured in DataBase connection: ${err}`);
      });

      await mongoose.connect(conf.dbString);
   } catch (error) {
      console.log(`error occured in DataBase connection: ${error}`);

      process.exit(1);
   }
};

export default connectDb;
