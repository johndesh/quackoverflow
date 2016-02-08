var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');
var SessionsApiUtil = require('../../util/sessions_api_util');

var UserForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {_errors: null};
  },

  _validatePassword: function (creds) {
    var isValid = true;
    if (creds.passwordconfirm !== creds.password) {
      this._renderErrors(['passwords must match']);
      isValid = false;
    } else if (creds.password.length > 0 && creds.password.length < 6) {
      this._renderErrors(['passwords must be at least 6 characters']);
      isValid = false;
    } else if (creds.password.length === 0){
      this._renderErrors(['you must enter a password']);
      isValid = false;
    } else {
      return isValid;
    }
  },

  _validateEmail: function (emailString) {
    if (emailString.match(/^\w+@\w+[.]\w+$/g)) {
      return true;
    } else {
      this._renderErrors(['not a valid email address']);
      return false;
    }
  },

  _renderErrors: function (errors) {
    this.setState({_errors: errors});
  },

  _validate: function (creds) {
    if (creds.username == undefined || creds.username === "") {
      this._renderErrors(['you need a username']);
      return false;
    }
    if (!this._validateEmail(creds.email)) {
      return false;
    }
    if (!this._validatePassword(creds)) {
      return false;
    }
    return true;
  },

  _redirectLogin: function (e) {
    e.preventDefault();
    this.history.pushState(null, "/users/login", {});
  },

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    var valid = this._validate(credentials);


    if ( valid ) {
      delete credentials.passwordconfirm;
      UsersApiUtil.createUser({user: credentials}, function () {
        SessionsApiUtil.login(credentials, function () {
          this.history.pushState(null, "/", {});
        }.bind(this));
      }.bind(this));
    }
  },

  render: function () {
    var errors;
    if (this.state._errors == undefined) {
      errors = <div></div>;
    } else {
      errors = <div className="form-error"><div className="message-tip group"></div>{this.state._errors[0]}</div>;
    }
    return (
      <div className="form-container">
        {errors}
        <form className="users-form" onSubmit={ this.submit }>

          <label>
            Display Name

            <input type="text" name="username" placeholder="J. Doe" />
          </label>
          <label>
            Email (required, but never shown)

            <input type="text" name="email" placeholder="you@example.org" />
          </label>
          <label>
            Password

            <input type="password" name="password" placeholder="********"/>
          </label>
          <label>
            Confirm Password

            <input type="password" name="passwordconfirm" placeholder="********"/>
          </label>

          <div className="form-controls">
            <button className="submit group" type="submit">Sign up</button>
            <button onClick={this._redirectLogin} className="login group">Login</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = UserForm;
