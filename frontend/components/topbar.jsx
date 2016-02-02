var React = require('react');
var SessionsApiUtil = require('./../util/sessions_api_util');
var CurrentUserStore = require('./../stores/current_user_store');
var History = require('react-router').History;

var Topbar = React.createClass({
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
    var linksWrap;
    var linksHtml;
    var topbarHtml = <div className="topbar">
                      <div className="topbar-wrapper">
                        <div className="network-items group">QuackExchange</div>
                          {linksWrap}
                        <div className="search-container group">
                          <input type="text" placeholder="Search Q&A" onKeyUp={ this.search } />
                        </div>
                      </div>
                    </div>;

    if (CurrentUserStore.userHasBeenFetched()) {
      linksWrap = <div className="topbar-links group">
                        <div className="links-container group">
                          {linksHtml}
                        </div>
                      </div>;
      if (CurrentUserStore.isLoggedIn()) {
        linksHtml =
        <div className="topbar-user-info group" onClick={this.showAccount}>
          <div className="avatar-wrapper">
            <img src={ this.state.currentUser.avatar } title={ this.state.currentUser.username } />
          </div>
          <span className="reputation">1</span>
        </div>
        <button onClick={ this.logout } className="logout group">Log Out</button>;
      } else {
        linksHtml = <a href="#/users/signup">sign up</a>
        <a href="#/users/login">log in</a>;
      }
    }
    return topbarHtml;
  }
});

module.exports = Topbar;
