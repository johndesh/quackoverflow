var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],
  getInitialState: function () {
    return {errors: {}};
  },

  submit: function (e) {
    e.preventDefault();

    var credentials = $(e.currentTarget).serializeJSON();
    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this), this._renderErrors);
  },

  _renderErrors: function (errors) {
    this.setState({errors: errors});
  },

  login_as_guest: function (e) {
    e.preventDefault();

    var credentials = { email: "guest@fake.com", password: "password" };

    SessionsApiUtil.login(credentials, function () {
      this.history.pushState({}, "/");
    }.bind(this));
  },

  render: function () {
    var errors;
    console.log(this.state.errors);
    if (this.state.errors.responseJSON === undefined) {
      errors = <div></div>;
    } else {
      errors = <div className="form-error">{this.state.errors.responseJSON[0]}</div>;
    }
    return (
      <div className="form-container">
        <form className="users-form" onSubmit={this.submit}>

          <label>
            Email
            <input type="text" name="email" placeholder="you@example.org"/>
          </label>

          <label>
            Password
            <input type="password" name="password" placeholder="********"/>
          </label>
          <div className="form-controls">
            <a href="#" onClick={this.login_as_guest} className="guest-login group">Log in as guest user</a>
            <button className="submit group">Log in</button>
          </div>
        </form>
        {errors}
      </div>
    );
  }
});

module.exports = SessionForm;
