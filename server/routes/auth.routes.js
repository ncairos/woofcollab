const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");
const Center = require("../models/Center.model");
const Dog = require("../models/Dog.model");

const mailer = require("../configs/nodemailer.config");

//----------SIGN UP----------//

authRoutes.post("/signup", (req, res, next) => {
  console.log(req.body);

  const { username, email, password, checked } = req.body;
  console.log(checked);
  if (!username | !email | !password) {
    res.status(400).json({ message: "Provide username, email and password" });
    return;
  }

  if (password.length < 2) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes."
    });
    return;
  }

  //----------CENTER AUTH----------//

  if (checked) {
    Center.findOne({ username }, (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "Username check went bad." });
        return;
      }

      if (foundUser) {
        res
          .status(400)
          .json({ message: "Username taken. Choose another one." });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new Center({
        username: username,
        email: email,
        password: hashPass
      });

      aNewUser.save(err => {
        if (err) {
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(aNewUser, err => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(aNewUser);
        });
      });
    });
  } else {
    //----------USER AUTH----------//

    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "Username check went bad." });
        return;
      }

      if (foundUser) {
        res
          .status(400)
          .json({ message: "Username taken. Choose another one." });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        username: username,
        email: email,
        password: hashPass
      });

      aNewUser.save(err => {
        if (err) {
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
          return;
        }

        // Automatically log in user after sign up
        // .login() here is actually predefined passport method
        req.login(aNewUser, err => {
          if (err) {
            res.status(500).json({ message: "Login after signup went bad." });
            return;
          }

          // Send the user's information to the frontend
          // We can use also: res.status(200).json(req.user);
          res.status(200).json(aNewUser);
        });
      });
    });
  }
});

//----------USER LOGIN AUTH----------//

authRoutes.post("/loginUser", (req, res, next) => {
  passport.authenticate("user-login", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//----------CENTER LOGIN AUTH----------//

authRoutes.post("/loginCenter", (req, res, next) => {
  passport.authenticate("center-login", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }
    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//----------USER PROFILE----------//
authRoutes.get("/profile", (req, res) => {
  const user = req.user._id;
  User.findById(user)
    .populate("calendar")
    .populate({
      path: "calendar",
      populate: {
        path: "dog",
        model: "Dog"
      }
    })
    .then(theUser => res.json(theUser))
    .catch(err => console.log("DB error", err));
});

//----------EDIT USER----------//
authRoutes.post("/edit", (req, res) => {
  const { email, name, address, imgPath, contact, about } = req.body.data;
  User.findByIdAndUpdate(
    req.body.id,
    {
      email,
      name,
      address,
      imgPath,
      contact,
      about
    },
    { new: true }
  )
    .then(user => res.json({ message: "User has been updated" }))
    .catch(err => console.log(err));
});

//----------LOGOUT SESSION----------//

authRoutes.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

//----------LOGGED IN SESSION----------//

authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

authRoutes.post("/sendEmail", (req, res, next) => {
  // console.log("WTFFFF");
  const dog = req.body.id;
  // console.log(dog);
  User.findById(req.user._id).then(user => {
    console.log("ES EL USEEEER", user);
    Dog.findById(dog)
      .populate("center")
      .then(theRequest => {
        const message = `<h4>Hello, ${theRequest.center.name} </h4><p>You have a new request for your dog ${theRequest.name}!<br><br>You can get i contact with ${req.user._id} <a href="http://localhost:3000/api/auth/profile/${req.user._id}">`;

        mailer.sendMail({
          from: '"WoofCollab Team" noreplyt@meat-app.com',
          to: `${theRequest.center.email}`,
          subject: `Dog Request ${theRequest.name}`,
          text: `A request for ${theRequest.name} has been sent`,
          html: `<p>A request for ${theRequest.name} has been sent</p>`
        });
      })
      .then(() => res.json({ message: "Dog has been requested" }))
      .catch(err => console.log(err));
    console.log(user);
  });
});

// authRoutes.post("/sendEmail"),
//   (req, res) => {

// const dog = req.body.id;
// console.log(dog);
// User.findById(req.user._id).then(user => {
//   console.log(user);
// });
// Dog.findById(dog).then(x => console.log("soy los detalles", x));
// .then(theRequest => {
//   const message = `<h4>Hello, ${theRequest.center.name} </h4><p>You have a new request for your dog ${theRequest.name}!<br><br>You can get i contact with ${req.user._id} <a href="http://localhost:3000/api/auth/profile/${req.user._id}">`;

//   mailer.sendMail({
//     from: '"WoofCollab Team" noreplyt@meat-app.com',
//     to: `${theRequest.center.email}`,
//     subject: `Dog Request ${theRequest.name}`,
//     text: `A request for ${theRequest.name} has been sent`,
//     html: `<p>A request for ${theRequest.name} has been sent</p>`
//   });
// })
// .then(() => res.json({ message: "Dog has been requested" }))
// .catch(err => console.log(err));
// };

module.exports = authRoutes;
