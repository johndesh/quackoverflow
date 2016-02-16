var React = require('react');
var History = require('react-router').History;


var IndexItem = React.createClass({
  mixins: [History],

  showQuestion: function () {
    var question = this.props.question;
    this.history.pushState(null, '/questions/' + question.id, {});
  },

  showUser: function (user) {
    this.history.pushState(null, '/users/' + user.id + '/' + user.username, {});
  },

  render: function () {
    if (this.props.question === undefined) {
      return <div></div>;
    }
    var question = this.props.question;

    var timeAgo;
    if (question._answerCount > 0) {
      var answered = question.answers[question.answers.length - 1].answered;
      var author = question.answers[question.answers.length - 1].author;
      timeAgo = <div className="question-details group"><span className="question-details-time" onClick={this.showQuestion.bind(this, question)}>answered {answered} ago </span><span className="question-details-author" onClick={this.showUser.bind(this, author)}>{author.username}</span></div>;
    } else if (question.modified !== question.asked) {
      timeAgo = <div className="question-details group"><span className="question-details-time" onClick={this.showQuestion}>modified {question.modified} ago </span><span className="question-details-author" onClick={this.showUser.bind(this, question.author)}>{question.author.username}</span></div>;
    } else {
      timeAgo = <div className="question-details group"><span className="question-details-time" onClick={this.showQuestion}>asked {question.asked} ago </span><span className="question-details-author" onClick={this.showUser.bind(this, question.author)}>{question.author.username}</span></div>;
    }
    var answersKlass = "question-stat-count answers group";
    answersKlass += (question.answers.length > 0) ? " answered" : "";

    return (
      <div className="question-item-wrapper">
        <div className="question-stats group">
          <div className="question-stat-count votes group">
            <div className="stat-count">{question.votes || 0}</div>
            <div className="stat-label">vote{question.votes === 1 ? "" : "s"}</div>
          </div>
          <div className={answersKlass}>
            <div className="stat-count">{question === undefined ? "0" : question.answers.length}</div>
            <div className="stat-label">answer{question.answers && question.answers.length === 1 ? "" : "s"}</div>
          </div>
          <div className="question-stat-count views group">
            <div className="stat-count">{question.views || 0}</div>
            <div className="stat-label">view{question.views === 1 ? "" : "s"}</div>
          </div>
        </div>
        <div className="question-index-item group">
          <div className="question-link-wrapper">
          <a onClick={this.showQuestion} className="question-link">{question.title}</a>
          </div>
          {timeAgo}
        </div>

      </div>
    );
  }
});

module.exports = IndexItem;
