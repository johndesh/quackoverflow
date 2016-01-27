var ApiActions = require('../actions/api_actions');

var ApiUtil = {

  fetchQuestions: function(){
    $.get('api/questions', function(questions){
      ApiActions.receiveAll(questions);
    });
  },

  fetchQuestion: function (questionId) {
    $.get('api/questions/' + questionId, function (question) {
      debugger;
      ApiActions.receiveAll([question]);
    });
  },

  createQuestion: function(data){
    $.post('api/questions', { question: data }, function(question) {
      ApiActions.receiveAll([question]);
    });
  },
};

module.exports = ApiUtil;
