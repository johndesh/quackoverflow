var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var History = require('react-router').History;
var MarkdownEditor = require('../editor');

var QuestionAnswersForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { body: "" };
  },

  createAnswer: function (parsedBody) {
    questionId = this.props.questionId;
    var answer = { body: parsedBody, question_id: questionId };
    QuestionsApiUtil.createAnswer(answer, function (id) {
      this.history.pushState(null, "/questions/" + id, {});
    }.bind(this));
  },

  handleChange: function (e) {
    this.setState({body: e.target.value});
  },

  render: function () {
    return (
      <div className="question-form-wrapper group">
        <div className="question-form" id="question-form">
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
