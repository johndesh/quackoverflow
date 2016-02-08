var React = require('react');
var VoteControls = require('../vote_controls');
var History = require('react-router').History;

var QuestionAnswer = React.createClass({
  mixins: [History],

  showUser: function (user) {
    this.history.pushState(null, '/users/' + user.id, {});
  },

  render: function () {
    var answer = this.props.answer;

    return(
      <div className="answer">
        <div className="vote group">
          <VoteControls voteValue={answer.userVoteValue} voteCount={answer.votes} votePath={this.props.votePath} />
        </div>
        <div className="answer-body markdown-body">
          <p dangerouslySetInnerHTML={{__html: answer.body}}></p>
        </div>
        <div className="answer-details">
          <span className="answer-details-time">answered {answer.answered} ago </span><span className="answer-details-author" onClick={this.showUser.bind(this, answer.author)}>{answer.author.username}</span>
        </div>
      </div>
    );
  }
});

module.exports = QuestionAnswer;
