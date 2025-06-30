const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.post("/add", async (req, res) => {
  const { teacherEmail, question, options, correctAnswer } = req.body;
  const count = await Question.countDocuments({ teacherEmail });
  if (count >= 50) return res.status(400).json({ message: "Limit reached" });
  await new Question({ teacherEmail, question, options, correctAnswer }).save();
  res.status(201).json({ message: "Question added" });
});

router.get("/all/:teacherEmail", async (req, res) => {
  const questions = await Question.find({ teacherEmail: req.params.teacherEmail });
  res.json(questions);
});

module.exports = router;