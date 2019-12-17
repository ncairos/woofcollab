const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    name: String,
    address: String,
    contact: Number,
    about: String,
    imgPath: {
      type: String,
      default:
        "https://res.cloudinary.com/woofcollab/image/upload/v1576490292/dogs/img.png.png"
    },
    imgName: {
      type: String
    },
    calendar: [{ type: Schema.Types.ObjectId, ref: "Calendar" }],
    walks: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],

    role: {
      type: String,
      default: "user"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
