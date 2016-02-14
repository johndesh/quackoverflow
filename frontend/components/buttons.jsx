var React = require('react');

var Button = React.createClass({
  getInitialState: function () {
    var initialState = {backgroundPositionX: this.props.buttonNum * -20 + 'px', backgroundPositionY: 0};
    if (this.props._undoEmpty || this.props._redoEmpty) {
      initialState.backgroundPositionY = -20;
    }
    return initialState;
  },

  componentWillReceiveProps: function (newProps) {
    if (newProps._undoEmpty || newProps._redoEmpty) {
      this.setState({backgroundPositionY: -20});
    } else if(newProps._undoEmpty === false || newProps._redoEmpty === false) {
      this.setState({backgroundPositionY: 0});
    }
  },

  _hover: function () {
    if (this.props._undoEmpty || this.props._redoEmpty) {
      // nothing to do here, button, disabled...
    } else {
  	  this.setState({ backgroundPositionY: (this.state.backgroundPositionY - 40) % -80 });
    }
  },

  _applyStyle: function (e) {
  	e.preventDefault();

  	this.props._applyStyle(e, window.getSelection().toString());
  },

  render: function () {
  	var spanStyle = {
  	  backgroundPosition: this.state.backgroundPositionX + " " + this.state.backgroundPositionY + 'px'
  	};

  	return(
  	  <li className="button" onMouseDown={this._applyStyle} onMouseEnter={this._hover} onMouseLeave={this._hover} data-style={this.props.styleMarkDown} id={this.props.buttonId}><span style={spanStyle}></span></li>
  	);
  }
});

var Buttons = React.createClass({

  render: function () {
  	return(
  		<ul className="button-bar-row">
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="**?**" buttonId='bold-button' buttonNum={0} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="*?*" buttonId="ital-button" buttonNum={1} />
	        <Button _applyStyle={this._linkModal} buttonId="link-button" buttonNum={2} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="&#13;&#10;> ?" buttonId="quote-button" buttonNum={3} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="`?`" buttonId="code-button" buttonNum={4} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="" buttonId="img-button" buttonNum={5} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="1. ?" buttonId="ol-button" buttonNum={6} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="- ?" buttonId="ul-button" buttonNum={7} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="# ?" buttonId="heading-button" buttonNum={8} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="&#13;&#13;&#13;&#10;----------&#13;&#10;" buttonId="hr-button" buttonNum={9} />
	        <Button _applyStyle={this.props._undo} _undoEmpty={this.props._undoEmpty} styleMarkDown="" buttonId="undo-button" buttonNum={10} />
	        <Button _applyStyle={this.props._redo} _redoEmpty={this.props._redoEmpty} styleMarkDown="" buttonId="redo-button" buttonNum={11} />
	        <Button _applyStyle={this.props._applyStyle} styleMarkDown="" buttonId="help-button" buttonNum={12} />
      </ul>
    );
  }
});

module.exports = Buttons;
