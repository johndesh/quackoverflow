var React = require('react');
var History = require('react-router').History;
var CurrentUserStore = require('../../stores/current_user_store');
var UsersApiUtil = require('../../util/users_api_util');
var SessionsApiUtil = require('../../util/sessions_api_util');

var EditUserForm = React.createClass({
  mixins: [History],
  getStateFromStore: function () {
    return CurrentUserStore.currentUser();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    var user;
    if (this.props.location.state) {
      user = this.props.location.state.user;
    } else {
      user =  this.getStateFromStore();
    }
    var avatar = user.avatar || "";
    return { user: user, avatarFile: null, avatarUrl: avatar, _errors: null };
  },

  componentWillReceiveProps: function (newProps) {

    if (newProps.location.state) {
      this.setState({user: newProps.location.state.user});
    } else {
      SessionsApiUtil.fetchCurrentUser();
    }
  },

  componentDidMount: function () {
    this.userListener = CurrentUserStore.addListener(this._onChange);

      SessionsApiUtil.fetchCurrentUser();

  },
  componentWillUnmount: function () {
    this.userListener.remove();
  },

  changeFile: function(e) {
    var reader = new FileReader();
    var file = e.currentTarget.files[0];

    reader.onloadend = function () {
      this.setState({avatarFile: file, avatarUrl: reader.result});
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file); // will trigger a load end event when it completes, and invoke reader.onloadend
    } else {
      this.setState({avatarFile: null, avatarUrl: ""});
    }
  },

  _validate: function (creds) {
    var isValid = true;
    if (creds.newpassword !== creds.password) {
      this._renderErrors(['passwords must match']);
      isValid = false;
    } else if (creds.password.length > 0 && creds.password.length < 6) {
      this._renderErrors(['passwords must be at least 6 characters']);
      isValid = false;
    } else {
      return isValid;
    }
  },

  _renderErrors: function (errors) {
    this.setState({_errors: errors});
  },

  _userDidUpdate: function (user) {
    this.history.pushState(null, '/users/' + user.id + '/' + user.username, {});
  },

  _assembleFormData: function (credentials) {
    var formData = new FormData();

    for (var key in credentials) {
      if (key === "newpassword") { continue; }

      if (!!credentials[key]) {
        formData.append("user[" + key + "]", credentials[key]);
      }
    }

    if (this.state.avatarFile) {
      formData.append("user[avatar]", this.state.avatarFile);
    }

    return formData;
  },

  _handleResponse: function (resp) {

      if (resp.errors && resp.errors.length > 0) {
        this._renderErrors(resp.errors);
      } else {
        this._userDidUpdate(resp);
      }
  },

  submit: function (e) {
    e.preventDefault();
    var userId = this.state.user.id;

    var credentials = $(e.currentTarget).serializeJSON();
    if (this._validate(credentials)) {
      var formData = this._assembleFormData(credentials);

      UsersApiUtil.updateUser(formData, userId, this._handleResponse);
    }
  },

  _goBack: function (e) {
    e.preventDefault();
    var user = this.state.user;
    this.history.pushState(null, '/users/' + user.id + '/' + user.username, {});
  },

  render: function () {
    if(!CurrentUserStore.userHasBeenFetched()) { return <div></div>; }
    var errors;
    if (this.state._errors == undefined) {
      errors = <div></div>;
    } else {
      errors = <div className="form-error"><div className="message-tip group"></div>{this.state._errors[0]}</div>;
    }
    return (
      <div className="form-container">
        <form className="users-form" onSubmit={ this.submit }>

          <label>
            Display Name

            <input type="text" name="username" defaultValue={ this.state.user.username } />
          </label>

          <label>
            Email (required, but never shown)

            <input type="text" name="email" defaultValue={ this.state.user.email } />
          </label>
          {errors}
          <label>
            Old Password

            <input type="password" name="oldpassword" placeholder="********"/>
          </label>
          <label>
            New Password

            <input type="password" name="newpassword" placeholder="********"/>
          </label>
          <label>
            Confirm New Password

            <input type="password" name="password" placeholder="********"/>
          </label>

          <label>Avatar
              <input type="file" onChange={this.changeFile} />
          </label>

          <img className="user-avatar-preview-image" src={this.state.avatarUrl}/>

          <div className="form-controls">
            <button onClick={this._goBack} className="discard group">Discard</button><button name='submit' className="submit group">Update</button>
          </div>
        </form>
      </div>
    );
  }
});

  module.exports = EditUserForm;
