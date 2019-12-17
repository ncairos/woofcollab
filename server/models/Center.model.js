const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const centerSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    name: String,
    bio: String,
    contact: Number,
    webpage: String,
    address: String,
    zipcode: Number,
    imgPath: {
      type: String,
      default: "https://media.mnn.com/assets/images/2017/04/group-of-dogs-different-breeds.jpg.653x0_q80_crop-smart.jpg"
    },
    imgName: {
      type: String
    },
    calendar: [String],
    walks: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    role: {
      type: String,
      default: "center"
    }
  },

  {
    timestamps: true
  }
);

const Center = mongoose.model("Center", centerSchema);
module.exports = Center;
