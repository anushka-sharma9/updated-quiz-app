const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  student: {
    name: String,
    email: String,
    phone: String
  },
  answers: [{
    questionId: mongoose.Schema.Types.ObjectId,
    selectedOption: String,
    correctAnswer: String
  }],
  teacherEmail: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("StudentResponse", responseSchema);