const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//--------------------MODELS--------------------//

const Dog = require("./Dog.model")

const commentSchema = new Schema(
  {
    name: String,
    message: String,
    dog: { type: Schema.Types.ObjectId, ref: "Dog" },
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
