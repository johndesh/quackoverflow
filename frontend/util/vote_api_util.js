var QuestionActions = require('../actions/question_actions');

var VoteApiUtil = {

  vote: function (votePath, value, callback) {
    $.post(votePath, { vote: {value: value} }, function(question) {
      if (!question.errors) {
        QuestionActions.receiveSingleQuestion(question);
      }
      callback && callback(question);
    });
  }
};

module.exports = VoteApiUtil;
