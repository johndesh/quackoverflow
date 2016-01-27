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
          <div className="votes">
            <div className="stat-count"></div>
            <div className="stat-label">votes</div>
          </div>
          <div className="answers">
            <div className="stat-count"></div>
            <div className="stat-label">answers</div>
          </div>
          <div className="views">
            <div className="stat-count"></div>
            <div className="stat-label">views</div>
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
