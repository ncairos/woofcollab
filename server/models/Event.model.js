const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    title: String,
    description: String,
    host: {
      type: Schema.Types.ObjectId,
      ref: "Center"
    },
    date: Date,
    time: String,
    calendar: [String],
  },
  {
    timestamps: true
  }
);

const EventModel = mongoose.model("Event", eventSchema);
module.exports = EventModel;
