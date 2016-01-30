var React = require('react');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require('./../stores/current_user_store');
var Search = require('./search');

var Header = React.createClass({

  getInitialState: function () {
    return { currentUser: {} };
  },

  componentDidMount: function () {
    CurrentUserStore.addListener(this._onChange);

    SessionsApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function () {
    CurrentUserStore.remove(this._onChange);
  },

  _onChange: function () {
    this.setState({ currentUser: CurrentUserStore.currentUser() });
  },

  logout: function() {
    SessionsApiUtil.logout();
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
              <div className="links-container">
                <p className="group">Logged in as { this.state.currentUser.username }</p>
                <button onClick={ this.logout } className="logout group">Log Out</button>
              </div>
              <div className="search-container group"><Search /></div>
          </div>
        </div>
      </div>
      );
    } else {
      return (
        <div className="topbar">
          <div className="topbar-wrapper">
            <div className="network-items">QuackExchange</div>
            <div className="topbar-links">
              <div className="links-container">
                <a href="#/users/signup">sign up</a>
                <a href="#/users/login">log in</a>
              </div>
              <div className="search-container group"><Search /></div>
            </div>
          </div>
        </div>
      );
    }
  }
});

module.exports = Header;
