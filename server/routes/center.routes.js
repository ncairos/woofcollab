const express = require("express");
const router = express.Router();
const Center = require("../models/Center.model");

router.get("/allCenters", (req, res) => {
  Center.find()
    .populate("walks")
    .then(allCenter => res.json(allCenter))
    .catch(err => console.log("DB error", err));
});

router.get("/:id", (req, res) => {
  const centerId = req.params.id;
  Center.findById(centerId)
    .then(theCenter => res.json(theCenter))
    .catch(err => console.log("DB error", err));
});

module.exports = router;
