var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');

var UserForm = React.createClass({
  mixins: [History],

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    UsersApiUtil.createUser({user: credentials}, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function () {
    return (
      <form onSubmit={ this.submit }>
        <h1>Sign Up</h1>

        <label>
          Username
          <input type="text" name="username" />
        </label>

        <label>
          Email
          <input type="text" name="email" />
        </label>

        <label>
          Password
          <input type="password" name="password" />
        </label>

        <button>Sign Up</button>
      </form>
    );
  }
});

module.exports = UserForm;
