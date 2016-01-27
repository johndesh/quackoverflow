var AppDispatcher = require('../dispatcher/dispatcher');
var QuestionConstants = require('../constants/question_constants');

var ApiActions = {
  receiveAll: function(questions){
    AppDispatcher.dispatch({
      actionType: QuestionConstants.QUESTIONS_RECEIVED,
      questions: questions
    });
  },

};

module.exports = ApiActions;
