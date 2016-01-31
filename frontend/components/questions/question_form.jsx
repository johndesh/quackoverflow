var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var QuestionForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { body: "" };
  },

  createQuestion: function (e) {
    e.preventDefault();

    var question = $(e.currentTarget).serializeJSON();
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

  render: function () {
    return (
      <div className="question-form-wrapper group">
        <form className="question-form" id="question-form" onSubmit={this.createQuestion}>
        <div className="form-item-title">
          <label forHTML="form-title">Title</label>
          <input type="text" name="title" className="title-field" id="form-title" placeholder="What's your programming question? Be specific."/>
        </div>
          <div className="body-editor">
          <textarea name="body" valueLink={this.linkState("body")} className="body-field"></textarea>
          <div className="gripple"></div>  
        </div>
          <div className="body-preview">
            <p onClick={this._handleClick}>{this.state.body}</p>
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
