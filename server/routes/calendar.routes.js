const express = require("express");
const router = express.Router();

//--------------------MODELS--------------------//

const Calendar = require("../models/Calendar.model");
const Dog = require("../models/Dog.model");
const User = require("../models/User.model");

//--------------------NEW CALENDAR--------------------//

router.post("/new/:id", (req, res) => {
  const user = req.user;
  const dog = req.params.id;
  const { title, start, end } = req.body;

  Calendar.create({ title, start, end, dog: dog, user: user })
    .then(theCalendar => {
      Dog.findByIdAndUpdate(
        dog,
        {
          $addToSet: { calendar: theCalendar._id }
        },
        { new: true }
      ).then(dog => {
        User.findByIdAndUpdate(
          user,
          {
            $addToSet: { calendar: theCalendar._id }
          },
          { new: true }
        )
          .then(user => res.json({ theCalendar, dog, user }))
          .catch(err => console.log("DB error", err));
      });
    })
    .catch(err => console.log("DB error", err));
});

module.exports = router;
