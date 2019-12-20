const express = require("express");
const router = express.Router();
const Center = require("../models/Center.model");
const Calendar = require("../models/Calendar.model")

//----------ALL CENTERS----------//
router.get("/allCenters", (req, res) => {
  Center.find()
    .populate("walks")
    .then(allCenter => res.json(allCenter))
    .catch(err => console.log("DB error", err));
});

//----------DETAILS CENTER----------//
router.get("/:id", (req, res) => {
  const centerId = req.params.id;
  Center.findById(centerId)
    .populate("walks")
    .populate({
      path: "walks",
      populate: {
        path: "calendar",
        model: "Calendar"
      }
    })
    .then(theCenter => res.json(theCenter))
    .catch(err => console.log("DB error", err));
});

//----------EDIT CENTER----------//
router.post("/edit", (req, res) => {
  const {
    email,
    name,
    bio,
    contact,
    webpage,
    address,
    zipcode,
    imgPath
  } = req.body.data;
  console.log(req.body.id);
  Center.findByIdAndUpdate(
    req.body.id,
    {
      email,
      name,
      bio,
      contact,
      webpage,
      address,
      zipcode,
      imgPath
    },
    { new: true }
  )
    .then(center => res.json({ message: "Center has been updated" }))
    .catch(err => console.log(err));
});

module.exports = router;
