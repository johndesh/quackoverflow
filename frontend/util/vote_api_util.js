var QuestionActions = require('../actions/question_actions');

var VoteApiUtil = {

  vote: function (votePath, value, callback) {
    $.post(votePath, { vote: {value: value} }, function(vote) {
      if (!vote.errors) {
        // QuestionActions.receiveSingleQuestion(question);
        QuestionActions.updateVoteValue(vote);
      }
      callback && callback(vote);
    });
  }
};

module.exports = VoteApiUtil;
