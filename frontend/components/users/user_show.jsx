var React = require('react');
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');
var History = require('react-router').History;
var Navigation = require('react-router').Navigation
var CurrentUserStore = require('../../stores/current_user_store');
var UserShow = React.createClass({
  mixins: [History, Navigation],

  getStateFromStore: function () {
    return { user: UsersStore.find(parseInt(this.props.params.userId)) };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {
    UsersApiUtil.fetchUser(parseInt(newProps.params.userId));
  },

  componentDidMount: function () {
    this.userListener = UsersStore.addListener(this._onChange);
    UsersApiUtil.fetchUser(parseInt(this.props.params.userId), function (user) {
      if (!this.props.params.username) {
        this.history.replaceState(null, user.id + "/" + user.username);
      }
    }.bind(this));
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  editUser: function(e) {
    e.preventDefault();
    this.history.pushState({user: this.state.user}, "/" + this.state.user.username + "/edit", {})
  },


  render: function () {
    if(this.state.user === undefined) { return <div></div>; }
    var editLink;
    if (CurrentUserStore.currentUser().id === this.state.user.id) {
      editLink = <a onClick={this.editUser}>click here to edit</a>
    }
    return (
      <div className="user-info">
        <div className="user-info-sidebar">
          <div className="avatar-large">
            <img src={this.state.user.avatar} />
          </div>
        </div>
        <div className="user-info-main">
          <div className="user-main-details">
            <h2>{this.state.user.username}</h2>
            {editLink}
          </div>
          <div className="user-main-stats">

          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserShow;
