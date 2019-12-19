const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");
const Center = require("../models/Center.model");
const User = require("../models/User.model")


//----------ALL DOGS----------//
router.get("/allDogs", (req, res) => {
  Dog.find()
    .populate("center")
    .then(allDogs => res.json(allDogs))
    .catch(err => console.log("DB error", err));
});

//----------DETAILS DOG----------//
router.get("/:id", (req, res) => {
  const dogId = req.params.id;
  Dog.findById(dogId)
    .populate("center")
    .populate("calendar")
    .populate("comments")
    .then(theDog => {
      console.log(theDog);
      res.json(theDog);
    })
    .catch(err => console.log("DB error", err));
});

//----------NEW DOG----------//
router.post("/new", (req, res) => {
  const center = req.user;
  const {
    name,
    breed,
    sex,
    age,
    weight,
    color,
    size,
    personality,
    description,
    imgPath
  } = req.body;

  Dog.create({
    name,
    breed,
    sex,
    age,
    weight,
    color,
    size,
    personality,
    description,
    imgPath,
    center: center._id
  })
    .then(theNewDog => {
      Center.findByIdAndUpdate(
        center._id,
        {
          $addToSet: { walks: theNewDog._id }
        },
        { new: true }
      )
        .then(center => res.json({ theNewDog, center }))
        .catch(err => console.log("DB error", err));
    })
    .catch(err => console.log("DB error", err));
});

//----------DELETE DOG----------//
router.get("/delete/:id", (req, res) => {
  Dog.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: "Dog has been deleted" }))
    .catch(err => console.log(err));
});

//----------EDIT DOG----------//
router.post("/edit/:id", (req, res) => {
  const {
    name,
    breed,
    sex,
    age,
    weight,
    color,
    size,
    personality,
    description,
    imgPath
  } = req.body;
  Dog.findByIdAndUpdate(req.params.id, {
    name,
    breed,
    sex,
    age,
    weight,
    color,
    size,
    personality,
    description,
    imgPath
  })
    .then(() => res.json({ message: "Dog has been updated" }))
    .catch(err => console.log(err));
});

//----------DOG PROFILE----------//
router.get("/profile/:id", (req, res) => {
  const dog = req.params.id;
  Dog.findById(dog)

    .populate("calendar")
    .populate({
      path: "calendar",
      populate: {
        path: "user",
        model: "User"
      }
    })
    .populate("comments")
    .then(theDog => res.json(theDog))
    .catch(err => console.log("DB error", err));
});

//----------EMAIL REQUEST----------//


module.exports = router;

