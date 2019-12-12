const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    email: String,
    password: String,
    name: String,
    address: String,
    imgPath: {
      type: String
    },
    imgName: {
      type: String
    },
    calendar: [String],
    walks: [{ type: Schema.Types.ObjectId, ref: "Dog" }],
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }]
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
