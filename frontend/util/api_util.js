var ApiActions = require('../actions/api_actions');

var ApiUtil = {

  fetchQuestions: function(){
    $.get('api/questions', function(questions){
      ApiActions.receiveAll(questions);
    });
  },

  fetchQuestion: function(id){
    $.get('api/questions/' + id, function(question){
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
