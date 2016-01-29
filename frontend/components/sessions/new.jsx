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
            <button className="submit group">Log in</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = SessionForm;
