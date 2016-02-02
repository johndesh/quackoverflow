var QuestionActions = require('../actions/question_actions');

var QuestionsApiUtil = {

  fetchQuestions: function(callback){
    $.get('api/questions', function(questions){
      QuestionActions.receiveAll(questions);
      callback && callback();
    });
  },

  fetchSingleQuestion: function(id){
    $.get('api/questions/' + id, function(question){
      QuestionActions.receiveSingleQuestion(question);
    });
  },

  createQuestion: function(data, callback){
    $.post('api/questions', { question: data }, function(question) {
      QuestionActions.receiveSingleQuestion(question);
      callback && callback(question.id);
    });
  }
};

module.exports = QuestionsApiUtil;
