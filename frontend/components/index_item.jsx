var React = require('react');

var IndexItem = React.createClass({
  render: function () {
    var question = this.props.question;
    return (
        <div className="question-index-item">
          {question.title}
          <br/>
          {question.body}
          <br/>
          Asked by: {question.author.username} on {question.created_at}
        </div>
    );
  }
});

module.exports = IndexItem;
