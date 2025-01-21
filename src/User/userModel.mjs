import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
      },
      email: {
         type: String,
         unique: true,
      },

      password: {
         type: String,
      },
   },
   { timestamps: true }
);

const Users = mongoose.model("user", userSchema);

export default Users;
