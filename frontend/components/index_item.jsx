var React = require('react');

var IndexItem = React.createClass({
  render: function () {
    var question = this.props.question;
    var thumb_style = {
      width: '50px',
      height: '50px'
    };
    return (
        <div className="question-index-item">
          {question.title}
          <br/>
          {question.body}
          <br/>
          Asked by: {question.author.username} on {question.created_at}.
          <img src={question.author.user_img || "https://www.gravatar.com/avatar/773721a79e9d145173f19c314be992c7?s=328&d=identicon&r=PG&f=1"} style={thumb_style}></img>
        </div>
    );
  }
});

module.exports = IndexItem;
