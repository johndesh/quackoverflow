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

  search: function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      var query = e.target.value;
      this.history.pushState(null, '/search', {query: query});
    } else {
      // do nothing...
    }
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
                <p className="group">Logged in as { this.state.currentUser.username }</p>
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
