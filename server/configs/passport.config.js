const User = require("../models/User.model");
const Center = require("../models/Center.model");

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.serializeUser((loggedInUser, done) => {
  if (loggedInUser instanceof User) {
    done(null, { id: loggedInUser._id, type: "User" });
  } else {
    done(null, { id: loggedInUser._id, type: "Center" });
  }
});

passport.deserializeUser((userIdFromSession, cb) => {
  if (userIdFromSession.type === "User") {
    User.findById(userIdFromSession.id, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }
      cb(null, userDocument);
    });
  } else {
    Center.findById(userIdFromSession.id, (err, userDocument) => {
      if (err) {
        cb(err);
        return;
      }
      //console.log("ESTAMOS EN EL DESERIALIZE " + userDocument);
      cb(null, userDocument);
    });
  }
});

passport.use(
  "user-login",
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: "Usuario no registrado." });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: "Contraseña incorrecta." });
        return;
      }

      next(null, foundUser);
    });
  })
);

passport.use(
  "center-login",
  new LocalStrategy((username, password, next) => {
    Center.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (!foundUser) {
        next(null, false, { message: "Usuario no registrado." });
        return;
      }

      if (!bcrypt.compareSync(password, foundUser.password)) {
        next(null, false, { message: "Contraseña incorrecta." });
        return;
      }

      next(null, foundUser);
    });
  })
);
