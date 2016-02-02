var React, cx, objectAssign;

React = require('react');

cx = require('classnames');

objectAssign = require('react/lib/Object.assign');

module.exports = React.createClass({
  displayName: "SpinKit",
  propTypes: {
    spinnerName: React.PropTypes.string.isRequired,
    noFadeIn: React.PropTypes.bool,
    overrideSpinnerClassName: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      spinnerName: 'three-bounce',
      noFadeIn: false,
      overrideSpinnerClassName: ""
    };
  },
  render: function() {
    var classTests, classes;
    classTests = {
      "fade-in": !this.props.noFadeIn,
      spinner: this.props.overrideSpinnerClassName === ""
    };
    classTests[this.props.overrideSpinnerClassName] = this.props.overrideSpinnerClassName;
    classes = cx(classTests);
    if (this.props.className) {
      classes = classes + " " + this.props.className;
    }

        return React.createElement("div", React.__spread({}, this.props, {
          "className": "three-bounce " + classes
        }), React.createElement("div", {
          "className": "bounce1"
        }), React.createElement("div", {
          "className": "bounce2"
        }), React.createElement("div", {
          "className": "bounce3"
        }));
  }
});
