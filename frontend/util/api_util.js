var ApiActions = require('../actions/api_actions');

var ApiUtil = {

  fetchQuestions: function(){
    $.get('api/questions', function(questions){
      ApiActions.receiveAll(questions);
    });
  },
  
  createQuestion: function(data){
    $.post('api/questions', { question: data }, function(question) {
      ApiActions.receiveAll([question]);
    });
  },
};

module.exports = ApiUtil;
