var QuestionActions = require('../actions/question_actions');

var QuestionsApiUtil = {

  fetchQuestions: function (callback) {
    $.get('api/questions', function(questions){
      QuestionActions.receiveAll(questions);
      callback && callback();
    });
  },

  fetchSingleQuestion: function (id) {
    $.get('api/questions/' + id, function(question){
      QuestionActions.receiveSingleQuestion(question);
    });
  },

  createQuestion: function (data, callback) {
    $.post('api/questions', { question: data }, function(question) {
      QuestionActions.receiveSingleQuestion(question);
      callback && callback(question.id);
    });
  },

  createAnswer: function(answer, callback) {
    $.post('/api/questions/' + answer.question_id + '/answers', { question_answer: answer }, function (question) {
      QuestionActions.receiveSingleQuestion(question);
      callback && callback(question.id);
    });
  }
};

module.exports = QuestionsApiUtil;
