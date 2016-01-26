var Store = require('flux/utils').Store;
var _questions = [];
var QuestionConstants = require('../constants/question_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var QuestionStore = new Store(AppDispatcher);

var resetQuestions = function (questions) {
  _questions = questions.slice(0);
};

QuestionStore.all = function () {
  return _questions.slice(0);
};

QuestionStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
    case QuestionConstants.QUESTIONS_RECEIVED:
      var result = resetQuestions(payload.questions);
      QuestionStore.__emitChange();
      break;
  }
};

module.exports = QuestionStore;
