var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var History = require('react-router').History;
var MarkdownEditor = require('../editor');
var QuestionForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { body: "", _errors: null};
  },

  _handleResponse: function (data) {
    if (data.errors) {
      this._renderErrors(data.errors);
    } else {
      this.history.pushState(null, "/questions/" + data.id, {});
    }
  },

  _renderErrors: function (errors) {
    this.setState({_errors: errors});
  },

  createQuestion: function (parsedBody) {
    var title = $('#question-title').val()
    var question = { title: title, body: parsedBody }
    QuestionsApiUtil.createQuestion(question, this._handleResponse);
  },

  handleChange: function (e) {
    this.setState({body: e.target.value});
  },

  applyStyle: function (styledBody) {
    this.setState({body: styledBody});
  },

  render: function () {
    var errors;
    if (this.state._errors == undefined) {
      errors = <div></div>;
    } else {
      errors = <div className="form-error"><div className="message-tip group"></div>{this.state._errors[0]}</div>;
    }

    return (
      <div className="question-form-wrapper group">
        {errors}
        <div className="question-form" id="question-form">
          <div className="form-item-title">
            <label forHTML="question-title">Title</label>
            <input type="text" name="title" className="title-field" id="question-title" placeholder="What's your programming question? Be specific."/>
          </div>
          <MarkdownEditor
            onChange={this.handleChange}
            submit={this.createQuestion}
            submitMessage="Post Your Question"
            body={this.state.body} 
            applyStyle={this.applyStyle} />
        </div>
      </div>
    );
  }

});

module.exports = QuestionForm;
