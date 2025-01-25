import passportJwt from "passport-jwt";
const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;
import passport from "passport";
import Users from "../User/userModel.mjs";

const opt = {
   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.jwt_secret,
};

export default passport.use(
   new JwtStrategy(opt, async (jwt_payload, done) => {
      try {
         const user = await Users.findOne(jwt_payload.sub);
         if (!user) {
            return done(null, false);
         }

         return done(null, user);
      } catch (error) {
         return done(error, false);
      }
   })
);
