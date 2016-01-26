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
        <div className="question-index-item">
          {question.title}
          <br/>


          {timeAgo}
        </div>
    );
  }
});

module.exports = IndexItem;
