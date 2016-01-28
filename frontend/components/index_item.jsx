var React = require('react');
var ReactRouter = require('react-router');

var IndexItem = React.createClass({
  mixins: [ReactRouter.history],

  render: function () {

    var question = this.props.question;
    var timeAgo;
    if (question.modified !== question.asked) {
      timeAgo = <div className="question-details group">Modified {question.modified} ago by {question.author.username}</div>;
    } else {
      timeAgo = <div className="question-details group"><span className="question-details-time">asked {question.asked} ago </span><span className="question-details-author">{question.author.username}</span></div>;
    }
    var answersKlass = "question-stat-count answers group";
    answersKlass += (question.answers.length > 0) ? " answered" : "";


    return (
      <div className="question-item-wrapper">
        <div className="question-stats group">
          <div className="question-stat-count votes group">
            <div className="stat-count">0</div>
            <div className="stat-label">votes</div>
          </div>
          <div className={answersKlass}>
            <div className="stat-count">{question.answers.length}</div>
            <div className="stat-label">answer{question.answers.length === 1 ? "" : "s"}</div>
          </div>
          <div className="question-stat-count views group">
            <div className="stat-count">{question.views | 0}</div>
            <div className="stat-label">view{question.views === 1 ? "" : "s"}</div>
          </div>
        </div>
        <div className="question-index-item group">
          <div className="question-link-wrapper">
          <a onClick={this.props.onClick} className="question-link">{question.title}</a>
          </div>
          {timeAgo}
        </div>
      </div>
    );
  }
});

module.exports = IndexItem;
