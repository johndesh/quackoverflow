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
    this.history.replaceState({user: this.state.user}, this.state.user.username + "/edit", {});
  },

  getInitialState: function () {
    var user;
    if (this.props.location.state) {
      user = this.props.location.state.user;
    } else {
      user =  this.getStateFromStore();
    }

    return { user: user, avatarFile: null, avatarUrl: "" };
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
    if (this.props.location.state) {
      this.setState({user: this.props.location.state.user});
      this.history.replaceState({user: this.state.user}, this.state.user.username + "/edit", {});
    } else {
      SessionsApiUtil.fetchCurrentUser();
    }
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

  submit: function (e) {
    e.preventDefault();
    var credentials = $(e.currentTarget).serializeJSON();
    var userId = this.state.user.id
    var formData = new FormData();
    formData.append("user[username]", credentials.username);
    formData.append("user[email]", credentials.email);
    formData.append("user[password]", credentials.password);
    formData.append("user[avatar]", this.state.avatarFile);
    UsersApiUtil.updateUser(formData, userId, function (user) {
      this.history.pushState(null, '/users/' + userId, {});
    }.bind(this));
  },
  render: function () {
    if(!CurrentUserStore.userHasBeenFetched()) { return <div></div>; }
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

          <label>
            Password

            <input type="password" name="password" placeholder="********"/>
          </label>

          <label>Avatar
              <input type="file" onChange={this.changeFile} />
          </label>

          <img className="preview-image" src={this.state.avatarUrl}/>

          <div className="form-controls">
            <button className="submit group">Update</button>
          </div>
        </form>
      </div>
    );
  }
});

  module.exports = EditUserForm;
