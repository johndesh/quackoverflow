var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var History = require('react-router').History;
var MarkdownEditor = require('../editor');
var QuestionForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { body: "" };
  },

  createQuestion: function (parsedBody) {
    var title = $('#question-title').val()
    var question = { title: title, body: parsedBody }
    QuestionsApiUtil.createQuestion(question, function (id) {
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
          <div className="form-item-title">
            <label forHTML="question-title">Title</label>
            <input type="text" name="title" className="title-field" id="question-title" placeholder="What's your programming question? Be specific."/>
          </div>
          <MarkdownEditor
            onChange={this.handleChange}
            submit={this.createQuestion}
            submitMessage="Post Your Question"
            body={this.state.body} />
        </div>
      </div>
    );
  }

});

module.exports = QuestionForm;
