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
      <div className="form-container">
        <form className="users-form" onSubmit={ this.submit }>

          <label>
            Display Name
            <br/>
            <input type="text" name="username" placeholder="J. Doe" />
          </label>
          <br/>
          <label>
            Email (required, but never shown)
            <br/>
            <input type="text" name="email" placeholder="you@example.org" />
          </label>
          <br/>
          <label>
            Password
            <br/>
            <input type="password" name="password" placeholder="********"/>
          </label>
          <br/>
          <button className="submit group">Sign up</button>
        </form>
      </div>
    );
  }
});

module.exports = UserForm;
