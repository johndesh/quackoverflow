var React = require('react');
var Buttons = require('./buttons');
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
var emoji = require('markdown-it-emoji');
md.use(emoji);
md.enable("newline");

var MarkdownEditor = React.createClass({
  mixins: [History],

  undoHistory: [],

  redoHistory: [],

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

  resetEditor: function () {
    this.setState({_editorHeight: "200px", dragging: false});
  },

  parseForSubmit: function (e) {
    e.preventDefault();
    parsedBody = md.render(this.props.body.toString());
    this.props.submit(parsedBody, this.resetEditor);
  },

  getCaretPosition: function (textarea) {
    return textarea.selectionStart;
  },

  setSelectionStyle: function (selection, caretStart, style) {
    var styleFrag = style.replace(/\?.*/g, "");
    var startPos = caretStart - styleFrag.length;
    var endPos = caretStart + selection.length + styleFrag.length;
    var styleHood = this.props.body.substring(startPos, endPos);
    var regex = new RegExp(styleFrag.replace(/\*/g, "/*") + selection + styleFrag.replace(/\*/g, "/*"))
    this.undoHistory.push(this.props.body);

    if (startPos < 0 || endPos > this.props.body.length) {
      return {
        replace: style.replace('?', selection),
        selectionStart: caretStart,
        selectionEnd: caretStart + selection.length
      };
    }
    if (styleHood.match(regex)) {
      return {
        replace: RegExp.lastMatch,
        selectionStart: startPos,
        selectionEnd: endPos
      };
    } else {
      return {
        replace: style.replace('?', selection),
        selectionStart: caretStart,
        selectionEnd: caretStart + selection.length
      };
    }
  },

  _applyStyle: function (e, selection) {
    var body = this.props.body;
    var startPos = this.getCaretPosition(document.getElementById('body-field'));
    var checkStyle = $(e.currentTarget).data('style');
    var selectionStyle = this.setSelectionStyle(selection, startPos, checkStyle);
    var styledBody = body.substring(0, selectionStyle.selectionStart) +
          selectionStyle.replace +
          body.substring(selectionStyle.selectionEnd, body.length);
    this.props.applyStyle(styledBody);
  },

  _undo: function () {
    this.redoHistory.push(this.props.body);
    this.props.applyStyle(this.undoHistory.pop());
  },

  _redo: function () {
    this.undoHistory.push(this.props.body);
    this.props.applyStyle(this.redoHistory.pop());
  },

  render: function () {

    return (
        <div className="markdown-editor">
          <div className="body-editor">
            <div className="button-bar"><Buttons _applyStyle={this._applyStyle} _undo={this._undo} _undoEmpty={this.undoHistory.length === 0} _redoEmpty={this.redoHistory.length === 0} _redo={this._redo} /></div>
            <textarea
              name="body"
              id="body-field"
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
