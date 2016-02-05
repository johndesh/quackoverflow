var React = require('react');
var VoteApiUtil = require('./../util/vote_api_util');
var CurrentUserStore = require('../stores/current_user_store');

var VoteControls = React.createClass({

  getInitialState: function () {
    return {vote: null};
  },
  
  _voteUp: function (e) {
    $('.vote-controls').children("div").removeClass("vote-up-off");
    if (CurrentUserStore.isLoggedIn()) {
      $(e.target).addClass("vote-up-on");
      VoteApiUtil.vote(this.props.votePath, 1);
    }
  },

  _voteDown: function (e) {
    $('.vote-controls').children("div").removeClass("vote-down-off");
    if (CurrentUserStore.isLoggedIn()) {
      $(e.target).addClass("vote-down-on");
      VoteApiUtil.vote(this.props.votePath, -1);
    }
  },

  render: function () {

    return(
      <div className="vote-controls">
        <div className={"vote-up"} onClick={this._voteUp}></div>
        <div className="vote-count">{this.props.voteCount}</div>
        <div className="vote-down" onClick={this._voteDown}></div>
      </div>
    );
  }
});

module.exports = VoteControls;
