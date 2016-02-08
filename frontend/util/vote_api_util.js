var QuestionActions = require('../actions/question_actions');

var VoteApiUtil = {

  vote: function (votePath, value, callback) {
    $.post(votePath, { vote: {value: value} }, function(data) {
      if (!data.vote.errors) {
        QuestionActions.updateVoteValue(data);
      }
      callback && callback(data);
    });
  }
};

module.exports = VoteApiUtil;
