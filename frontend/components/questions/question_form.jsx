var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var History = require('react-router').History;

var QuestionForm = React.createClass({
  mixins: [LinkedStateMixin, History],

  getInitialState: function () {
    return { body: "" , _editorHeight: "200px", dragging: false};
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

  _startResize: function () {
    $(".body-field").css({"opacity": .25});
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
