var React = require('react');
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');
var SearchApiUtil = require('../../util/search_api_util');
var UserIndexItem = require('./user_index_item');
var SearchResultsStore = require('../../stores/search_results_store');
var UserIndex = React.createClass({
  getInitialState: function () {
    return {users: UsersStore.all()};
  },

  _usersChanged: function () {
    this.setState({users: UsersStore.all()});
  },

  _usersFiltered: function () {
    this.setState({users: SearchResultsStore.allUsers()});
  },

  componentDidMount: function () {
    this.userListener = UsersStore.addListener(this._usersChanged);
    this.userSearchListener = SearchResultsStore.addListener(this._usersFiltered);
    UsersApiUtil.fetchUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.userSearchListener.remove();
  },

  searchUsers: function(e) {
    var query = e.target.value;

    if (query.length === 0) {
      UsersApiUtil.fetchUsers();
    } else {
      SearchApiUtil.searchUsers(query);
    }
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
            <a href="#" onClick={_handleClick} className="clicked group">all</a>
            <a href="#" onClick={_handleClick} className="group">new users</a>
            <a href="#" onClick={_handleClick} className="group">editors</a>
            <a href="#" onClick={_handleClick} className="group">moderators</a>
          </nav>
        </div>
        <div className="user-search-container">
          <input className="user-search-input" type="text" onKeyUp={ this.searchUsers } placeholder="start typing to search"/>

        </div>
        <div className="users-index group">
          {users}
        </div>
      </div>
    );
  }
});

module.exports = UserIndex;
