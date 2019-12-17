const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
  {
    title: String,
    start: Date,
    end: Date,
    dog: { type: Schema.Types.ObjectId, ref: "Dog" },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Calendar = mongoose.model("Calendar", calendarSchema);
module.exports = Calendar;
