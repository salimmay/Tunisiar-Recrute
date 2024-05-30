const mongoose = require('mongoose');

const quizQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v.length > 1;
      },
      message: props => `${props.value} should have at least two options`
    }
  },
  correctOption: {
    type: String,
    required: true
  },
  internshipOffer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InternshipOffer",
    required: true
  }
});

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);
