const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const Doctor = require("../models/doctor");

let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "NINJA",
};
passport.use(
  new JWTStrategy(opts, function (jwtPayload, done) {
    Doctor.findById(jwtPayload._id)
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        console.log("Error in finding Doctor", err);
        return done(err, false);
      });
  })
);

module.exports = passport;
