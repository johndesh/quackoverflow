var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var History = require('react-router').History;
var MarkdownEditor = require('../editor');
var CurrentUserStore = require('../../stores/current_user_store');

var QuestionAnswersForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { body: "" };
  },

  createAnswer: function (parsedBody, callback) {
    questionId = this.props.questionId;
    var answer = { body: parsedBody, question_id: questionId };
    QuestionsApiUtil.createAnswer(answer, function (question) {
      this.setState({body: ""});
      callback && callback()
    }.bind(this));
  },

  handleChange: function (e) {
    this.setState({body: e.target.value});
  },

  render: function () {
    return (
      <div className="question-form-wrapper group">
        <div className="question-form" id="question-form">
          <div className="new-answer-header">
            Your Answer
          </div>
          <MarkdownEditor
            onChange={this.handleChange}
            submit={this.createAnswer}
            submitMessage="Post Your Answer"
            body={this.state.body} />
        </div>
      </div>
    );
  }
});

module.exports = QuestionAnswersForm;
