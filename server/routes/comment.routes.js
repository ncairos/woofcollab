const express = require("express");
const router = express.Router();

//--------------------MODELS--------------------//

const Comment = require("../models/Comment.model");
const Dog = require("../models/Dog.model");
const User = require("../models/User.model");

//--------------------NEW COMMENT--------------------//

router.post("/new/:id", (req, res) => {
  const user = req.user;
  const dog = req.params.id;
  const { name, message } = req.body;

  Comment.create({ name, message, dog: dog, user: user })
    .then(theComment => {
      Dog.findByIdAndUpdate(
        dog,
        {
          $addToSet: { comments: theComment._id }
        },
        { new: true }
      )
        .populate("dog")
        .then(dog => {
          User.findByIdAndUpdate(
            user,
            {
              $addToSet: { comments: theComment._id }
            },
            { new: true }
          )
            .then(user => res.json({ theComment, dog, user }))
            .catch(err => console.log("DB error", err));
        });
    })
    .catch(err => console.log("DB error", err));
});

module.exports = router;
