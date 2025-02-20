import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Users from "../User/userModel.mjs";
import bcrypt from "bcrypt";

export default passport.use(
   new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
         try {
            const user = await Users.findOne({ email });

            if (!user) return done(null, false, { message: "Invalid Email" });
            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass)
               return done(null, false, { message: "Invalid password" });

            done(null, user);
         } catch (error) {
            done(error);
         }
      }
   )
);
