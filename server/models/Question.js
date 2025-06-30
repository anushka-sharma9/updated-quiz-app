const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  teacherEmail: String,
  question: String,
  options: [String],
  correctAnswer: String
});

module.exports = mongoose.model("Question", questionSchema);