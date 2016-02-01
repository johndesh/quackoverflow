var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;
var hljs = require('highlight.js');
var md = require('markdown-it')({
  html: true,
  linkify: false,
  typographer: false,
  breaks: false,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    } else {
      try {
        return hljs.highlightAuto(str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

md.enable("newline");

var QuestionForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {

    return { body: "" , _editorHeight: "200px", dragging: false};
  },

  createQuestion: function (e) {
    e.preventDefault();

    var question = $(e.currentTarget).serializeJSON();
    question.body = md.render(this.state.body.toString())
    QuestionsApiUtil.createQuestion(question, function (id) {
      this.history.pushState(null, "/questions/" + id, {});
    }.bind(this));
  },

  _handleClick: function () {
    $("body").scrollTop(140);
  },

  _handleDiscard: function () {
    var message = "Are you sure you want to discard your draft?";

    if (confirm(message)) {
      this.history.pushState(null, "#", {});
    } else {
      this._handleClick();
    }
  },

  _startResize: function () {
    $(".body-field").css({"opacity": 0.25});
    this.setState({dragging: true})
    $(document).mousemove(this._resizeEditor);
    $(document).mouseup(this._endDrag);

  },

  _resizeEditor: function (e) {
    this.setState({_editorHeight: (e.pageY - 226) + "px"});
  },

  _endDrag: function (e) {
    if (this.state.dragging) {
      $(".body-field").css({"opacity": 1});
      $(document).unbind('mousemove');
      this.setState({dragging: false});
    }
  },

  rawMarkup: function() {
   var rawMarkup = md.render(this.state.body.toString());

   return { __html: rawMarkup };
  },

  render: function () {
    return (
      <div className="question-form-wrapper group">
        <form className="question-form" id="question-form" onSubmit={this.createQuestion}>
        <div className="form-item-title">
          <label forHTML="form-title">Title</label>
          <input type="text" name="title" className="title-field" id="form-title" placeholder="What's your programming question? Be specific."/>
        </div>
          <div className="body-editor">
          <textarea name="body" style={{height: this.state._editorHeight}} valueLink={this.linkState("body")} className="body-field"></textarea>
          <div className="gripple" onMouseDown={this._startResize}></div>
        </div>
          <div className="body-preview markdown-body" onClick={this._handleClick} dangerouslySetInnerHTML={this.rawMarkup()}>

          </div>
          <div className="form-submit">
            <button className="submit-button">
              Post Your Question
            </button>
            <a onClick={this._handleDiscard} className="discard-question">
              discard
            </a>
          </div>
        </form>
      </div>
    );
  }

});

module.exports = QuestionForm;
