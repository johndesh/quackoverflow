var ApiActions = require('../actions/api_actions');

var ApiUtil = {

  fetchQuestions: function(){
    $.get('api/questions', function(questions){
      ApiActions.receiveAll(questions);
    });
  },

  fetchSingleQuestion: function(id){
    $.get('api/questions/' + id, function(question){
      ApiActions.receiveSingleQuestion(question);

    });
  },
  
  createQuestion: function(data){
    $.post('api/questions', { question: data }, function(question) {
      ApiActions.receiveAll([question]);
    });
  },
};

module.exports = ApiUtil;
