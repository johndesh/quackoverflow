var QuestionActions = require('../actions/question_actions');

var QuestionsApiUtil = {

  fetchQuestions: function(){
    $.get('api/questions', function(questions){
      QuestionActions.receiveAll(questions);
    });
  },

  fetchSingleQuestion: function(id){
    $.get('api/questions/' + id, function(question){
      QuestionActions.receiveSingleQuestion(question);

    });
  },

  createQuestion: function(data){
    $.post('api/questions', { question: data }, function(question) {
      QuestionActions.receiveAll([question]);
    });
  },
};

module.exports = QuestionsApiUtil;
