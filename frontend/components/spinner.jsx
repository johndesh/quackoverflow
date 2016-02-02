var React, cx, objectAssign;

React = require('react');

/*!
  Copyright (c) 2015 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/

cx = function classNames() {
	var classes = '';
	var arg;

	for (var i = 0; i < arguments.length; i++) {
		arg = arguments[i];
		if (!arg) {
			continue;
		}

		if ('string' === typeof arg || 'number' === typeof arg) {
			classes += ' ' + arg;
		} else if (Object.prototype.toString.call(arg) === '[object Array]') {
			classes += ' ' + classNames.apply(null, arg);
		} else if ('object' === typeof arg) {
			for (var key in arg) {
				if (!arg.hasOwnProperty(key) || !arg[key]) {
					continue;
				}
				classes += ' ' + key;
			}
		}
	}
	return classes.substr(1);
};


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
