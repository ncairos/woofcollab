const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Center = require("./Center.model");

const dogSchema = new Schema(
  {
    ref: Number,
    center: { type: Schema.Types.ObjectId, ref: "Center" },
    centerName: String,
    name: String,
    breed: String,
    sex: { type: String, enum: ["male", "female"] },
    age: Number,
    weight: Number,
    color: String,
    size: { type: String, enum: ["small", "medium", "big"] },
    personality: String,
    description: String,
    imgPath: {
      type: String
    },
    imgName: {
      type: String
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
    calendar: [String]
  },
  {
    timestamps: true
  }
);

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
