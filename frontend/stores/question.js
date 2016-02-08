var Store = require('flux/utils').Store;
var _questions = {};
var QuestionConstants = require('../constants/question_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var QuestionStore = new Store(AppDispatcher);



var resetQuestions = function (questions) {
  _questions = {};
  questions.forEach(function (question) {
    _questions[question.id] = question;
  });
};

var resetQuestion = function (question) {
  _questions[question.id] = question;
};

QuestionStore.all = function () {
  var questions = [];
  for (var id in _questions) {
    questions.unshift(_questions[id]);
  }
  return questions;
};

QuestionStore.find = function (id) {
  return _questions[id];
};

QuestionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case QuestionConstants.QUESTIONS_RECEIVED:
      resetQuestions(payload.questions);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.QUESTION_RECEIVED:
      resetQuestion(payload.question);
      QuestionStore.__emitChange();
      break;
    case QuestionConstants.VOTE_UPDATED:
      var question = QuestionStore.find(payload.vote.questionId);
      var post = question;
      if (payload.vote.vote.votable_type === "QuestionAnswer") {
        post = question.answers.filter(function (answer) {
          return answer.id === payload.vote.vote.votable_id;
        })[0];
      }
      post.userVoteValue += payload.vote.vote.value;
      post.votes = post.votes + payload.vote.vote.value;
      QuestionStore.__emitChange();

      break;
    }
};

module.exports = QuestionStore;
