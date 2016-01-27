var React = require('react');

var IndexItem = React.createClass({
  render: function () {
    var question = this.props.question;
    var thumb_style = {
      width: '50px',
      height: '50px'
    };
    var timeAgo;
    if (question.modified !== question.asked) {
      timeAgo = <div className="question-details">Modified {question.modified} ago by {question.author.username}</div>;
    } else {
      timeAgo = <div className="question-details">Asked {question.asked} ago by {question.author.username}</div>;
    }

    return (
      <div className="question-item-wrapper">
        <div className="question-stats group">
          <div className="question-stat-count votes group">
            <div className="stat-count">0</div>
            <div className="stat-label">votes</div>
          </div>
          <div className="question-stat-count answers group">
            <div className="stat-count">{question.answers}</div>
            <div className="stat-label">answer{question.answers === 1 ? "" : "s"}</div>
          </div>
          <div className="question-stat-count views group">
            <div className="stat-count">1</div>
            <div className="stat-label">view</div>
          </div>
        </div>
        <div className="question-index-item group">
          <a className="question-link">{question.title}</a>

          {timeAgo}
        </div>
      </div>
    );
  }
});

module.exports = IndexItem;
