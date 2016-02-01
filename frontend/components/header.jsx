var React = require('react');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require('./../stores/current_user_store');
var History = require('react-router').History;

var Header = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { currentUser: {} };
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this._onChange);
    if (!CurrentUserStore.userHasBeenFetched()) {
      SessionsApiUtil.fetchCurrentUser();
    }
  },

  componentWillUnmount: function () {
    CurrentUserStore.remove(this._onChange);
  },

  _onChange: function () {
    this.setState({ currentUser: CurrentUserStore.currentUser() });
  },

  logout: function() {
    SessionsApiUtil.logout(function () {
      this.history.pushState(null, '#', {});
    }.bind(this));
  },

  search: function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      var query = e.target.value;
      $(e.target).val("");
      this.history.pushState(null, '/search', {query: query});
    } else {
      // do nothing...
    }
  },

  showAccount: function () {
    var userId = this.state.currentUser.id;
    this.history.pushState(null, '/users/' + userId, {});
  },

  render: function () {
    if (!CurrentUserStore.userHasBeenFetched()) {
      return(
        <div className="topbar">
          <div className="topbar-wrapper">
            <div className="network-items group">QuackExchange</div>
          </div>
        </div>
        );
    } else if (CurrentUserStore.isLoggedIn()) {
      return (
        <div className="topbar">
          <div className="topbar-wrapper">
            <div className="network-items group">QuackExchange</div>
            <div className="topbar-links group">
              <div className="links-container group">
                <div className="topbar-user-info group" onClick={this.showAccount}>
                  <div className="avatar-wrapper">
                    <img src={ this.state.currentUser.avatar } title={ this.state.currentUser.username } />
                  </div>
                  <span className="reputation">1</span>
                </div>
                <button onClick={ this.logout } className="logout group">Log Out</button>
              </div>
              <div className="search-container group">
                <input type="text" placeholder="Search Q&A" onKeyUp={ this.search } />
              </div>
          </div>
        </div>
      </div>
      );
    } else {
      return (
        <div className="topbar">
          <div className="topbar-wrapper">
            <div className="network-items group">QuackExchange</div>
            <div className="topbar-links group">
              <div className="links-container group">
                <a href="#/users/signup">sign up</a>
                <a href="#/users/login">log in</a>
              </div>
              <div className="search-container group">
                <input type="text" placeholder="Search Q&A" onKeyUp={ this.search } />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = Header;
