var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function () {
    return (
      <form onSubmit={this.submit}>
        <h1>Log In</h1>

        <label>
          Username
          <input type="text" name="username" />
        </label>

        <label>
          Password
          <input type="password" name="password" />
        </label>

        <button>Log In</button>
      </form>
    );
  }
});

module.exports = SessionForm;
