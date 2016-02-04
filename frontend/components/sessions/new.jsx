var React = require('react');
var History = require('react-router').History;
var SessionsApiUtil = require('./../../util/sessions_api_util');

var SessionForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {errors: {}, returnUri: (this.props.location.query.returnUri || "/") };
  },

  login: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    this.submit(credentials);
  },

  submit: function (credentials) {
    SessionsApiUtil.login(credentials, function () {

      this.history.pushState(null, this.state.returnUri, {});
    }.bind(this), this._renderErrors);
  },

  _renderErrors: function (errors) {
    this.setState({errors: errors});
  },

  login_as_guest: function (e) {
    e.preventDefault();

    var credentials = { email: "guest@fake.com", password: "password" };

    this.submit(credentials);
  },

  render: function () {
    var errors;

    if (this.state.errors.responseJSON === undefined) {
      errors = <div></div>;
    } else {
      errors = <div className="form-error"><div className="message-tip group"></div>{this.state.errors.responseJSON[0]}</div>;
    }
    return (
      <div className="form-container">
        <form className="users-form" onSubmit={this.login}>

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
