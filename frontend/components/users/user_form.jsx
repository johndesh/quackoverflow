var React = require('react');
var History = require('react-router').History;
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');
var SessionsApiUtil = require('../../util/sessions_api_util');

var UserForm = React.createClass({
  mixins: [History],

  // getInitialState: function () {
  //   return { avatarFile: null, avatarUrl: "" };
  // },
  //
  // changeFile: function(e) {
  //   var reader = new FileReader();
  //   var file = e.currentTarget.files[0];
  //
  //   reader.onloadend = function () {
  //     this.setState({avatarFile: file, avatarUrl: reader.result});
  //   }.bind(this);
  //
  //   if (file) {
  //     reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
  //   } else {
  //     this.setState({avatarFile: null, avatarUrl: ""});
  //   }
  // },

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    // formData = new FormData();
    // formData.append("user[username]", credentials.username);
    // formData.append("user[email]", credentials.email);
    // formData.append("user[password]", credentials.password);
    // formData.append("user[avatar]", this.state.avatarFile);
    UsersApiUtil.createUser({user: credentials}, function () {
      SessionsApiUtil.login(credentials, function () {
        this.history.pushState(null, "/", {});
      }.bind(this));
    }.bind(this));
  },

  render: function () {
    return (
      <div className="form-container">
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

          <div className="form-controls">
            <button className="submit group">Sign up</button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = UserForm;
