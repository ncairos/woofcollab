const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("./passport.config");
const mongoose = require("mongoose");

module.exports = app => {
  app.use(
    session({
      secret: "Whatever",
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};
