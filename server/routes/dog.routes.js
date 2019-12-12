const express = require("express");
const router = express.Router();
const Dog = require("../models/Dog.model");

router.get("/allDogs", (req, res) => {
  Dog.find()
    .then(allDogs => res.json(allDogs))
    .catch(err => console.log("DB error", err));
});

router.get("/:id", (req, res) => {
  const dogId = req.params.id;
  Dog.findById(dogId)
    .then(theDog => res.json(theDog))
    .catch(err => console.log("DB error", err));
});

router.post("/new", (req, res) => {
  const dog = req.body;
  Dog.create(dog)
    .then(theNewDog => res.json(theNewDog))
    .catch(err => console.log("DB error", err));
});

module.exports = router;
