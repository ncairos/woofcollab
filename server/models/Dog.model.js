const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Calendar = require("./Calendar.model");

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
      type: String,
      default:
        "https://res.cloudinary.com/woofcollab/image/upload/v1576490292/dogs/img.png.png"
    },
    imgName: {
      type: String
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "User" }],
    calendar: [{ type: Schema.Types.ObjectId, ref: "Calendar" }]
  },
  { timestamps: true }
);

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
