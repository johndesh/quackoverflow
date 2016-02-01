var React = require('react');
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');
var UserIndexItem = require('./user_index_item');

var UserIndex = React.createClass({
  getInitialState: function () {
    return {users: UsersStore.all()};
  },

  _usersChanged: function () {
    this.setState({users: UsersStore.all()});
  },

  componentDidMount: function () {
    this.userListener = UsersStore.addListener(this._usersChanged);
    UsersApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  render: function () {
    var users = this.state.users.map(function (user, idx) {
      return (
        <UserIndexItem key={idx} user={user}/>
      );
    });

    var _handleClick = function(e) {
      e.preventDefault();
      $('.sub-header-nav').children('a').removeClass('clicked');
      $(e.currentTarget).addClass("clicked");
    };

    return (
      <div className="question-index-wrapper">
        <div className="sub-header">
          <h2 className="group">Users</h2>
          <nav className="sub-header-nav group">
            <a href="#" onClick={_handleClick} className="clicked group">reputation</a>
            <a href="#" onClick={_handleClick} className="group">new users
              <span className="featured-count-tab group">391</span></a>
            <a href="#" onClick={_handleClick} className="group">voters</a>
            <a href="#" onClick={_handleClick} className="group">editors</a>
            <a href="#" onClick={_handleClick} className="group">moderators</a>
          </nav>
        </div>
        <div className="users-search">
          <label>Type to find users:
            <input className="user-search-input" ontype="text" />
          </label>
        </div>
        <div className="users-index group">
          {users}
        </div>
      </div>
    );
  }
});

module.exports = UserIndex;
