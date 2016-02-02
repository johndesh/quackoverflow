var React = require('react');
var History = require('react-router').History;
var hljs = require('highlight.js');
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
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

var MarkdownEditor = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { _editorHeight: "200px", dragging: false };
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

  _startResize: function (e) {
    $(".body-field").css({"opacity": 0.25});
    this.setState({dragging: true, startY: e.pageY })
    $(document).mousemove(this._resizeEditor);
    $(document).mouseup(this._endDrag);
  },

  _resizeEditor: function (e) {
    var newHeight = $('.body-field').outerHeight() + (e.pageY - this.state.startY);
    this.setState({_editorHeight: newHeight + "px", startY: e.pageY});
  },

  _endDrag: function (e) {
    if (this.state.dragging) {
      $(".body-field").css({"opacity": 1});
      $(document).unbind('mousemove');
      $(document).unbind('mouseup');
      this.setState({dragging: false});
    }
  },

  rawMarkup: function() {
   var rawMarkup = md.render(this.props.body.toString());
   return { __html: rawMarkup };
  },

  parseForSubmit: function (e) {
    e.preventDefault();
    parsedBody = md.render(this.props.body.toString());
    this.props.submit(parsedBody);
  },

  render: function () {
    return (
        <div className="markdown-editor">
          <div className="body-editor">
            <textarea
              name="body"
              style={{height: this.state._editorHeight}}
              onChange={this.props.onChange}
              className="body-field"
              value={this.props.body}></textarea>
            <div className="gripple" onMouseDown={this._startResize}></div>
          </div>
          <div
            className="body-preview markdown-body"
            onClick={this._handleClick}
            dangerouslySetInnerHTML={this.rawMarkup()}></div>
          <div className="form-submit">
            <button onClick={this.parseForSubmit} className="submit-button">
              {this.props.submitMessage}
            </button>
            <a onClick={this._handleDiscard} className="discard-question">
              discard
            </a>
          </div>
        </div>
    );
  }
});

module.exports = MarkdownEditor;
