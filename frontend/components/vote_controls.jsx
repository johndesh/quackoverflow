var React = require('react');
var VoteApiUtil = require('./../util/vote_api_util');
var CurrentUserStore = require('../stores/current_user_store');

var VoteControls = React.createClass({

  _voteUp: function (e) {
    if (CurrentUserStore.isLoggedIn()) {
      VoteApiUtil.vote(this.props.votePath, 1);
    }
  },

  _voteDown: function (e) {
    if (CurrentUserStore.isLoggedIn()) {
      VoteApiUtil.vote(this.props.votePath, -1);
    }
  },

  render: function () {

    return(
      <div className="vote-controls">
        <div className={(this.props.voteValue > 0) ? "vote-up-on" : "vote-up-off"} onClick={this._voteUp}></div>
        <div className="vote-count">{this.props.voteCount}</div>
        <div className={(this.props.voteValue < 0) ? "vote-down-on" : "vote-down-off"} onClick={this._voteDown}></div>
      </div>
    );
  }
});

module.exports = VoteControls;
