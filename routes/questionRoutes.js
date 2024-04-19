const express = require('express');
const router = express.Router();
const Question = require('../model/questionSchema');


router.post('/', async (req, res) => {
  try {
    const { question, options, correctIndex } = req.body;
    const newQuestion = new Question({
      question,
      options,
      correctIndex
    });
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', getQuestion, (req, res) => {
  res.json(res.question);
});

router.patch('/:id', getQuestion, async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const question = await Question.findById(req.params.id);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      await Question.deleteOne({ _id: req.params.id });  
      res.json({ message: 'Question deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

async function getQuestion(req, res, next) {
  let question;
  try {
    question = await Question.findById(req.params.id);
    if (question == null) {
      return res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.question = question;
  next();
}

router.post('/submit', async (req, res) => {
    try {
      const selectedAnswers = req.body; 

      const questions = await Question.find();
  
      let score = 0;
      questions.forEach(question => {
        if (selectedAnswers[question._id] === question.correctIndex) {
          score++;
        }
      });
  
      res.json({ score });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
