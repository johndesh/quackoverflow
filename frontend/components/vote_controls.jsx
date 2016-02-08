var React = require('react');
var VoteApiUtil = require('./../util/vote_api_util');
var CurrentUserStore = require('../stores/current_user_store');

var VoteControls = React.createClass({
  getInitialState: function () {
    return {_modalShown: false};
  },

  _voteUp: function (e) {
    if (this.props.voteValue < 1) {

      if (CurrentUserStore.isLoggedIn()) {
        VoteApiUtil.vote(this.props.votePath, 1);
      } else {
        this._showModal();
      }
    }
  },

  _voteDown: function (e) {
    if (this.props.voteValue > -1) {

      if (CurrentUserStore.isLoggedIn()) {
        VoteApiUtil.vote(this.props.votePath, -1);
      } else {
        this._showModal();
      }
    }
  },

  _showModal: function () {
    var listener = $(document).on('click', this._hideModal);
    this.setState({_modalShown: true});
  },

  _hideModal: function () {
    $(document).unbind('click');
    this.setState({_modalShown: false});
  },

  render: function () {
    var modal;
    if (this.state._modalShown) {
      modal = <div className="vote-modal"><p className="modal-message">Must be logged in to vote</p></div>;
    }
    return(
      <div className="vote-controls">
        <div className={(this.props.voteValue > 0) ? "vote-up-on" : "vote-up-off"} onClick={this._voteUp}></div>
        <div className="vote-count">{this.props.voteCount}</div>
        <div className={(this.props.voteValue < 0) ? "vote-down-on" : "vote-down-off"} onClick={this._voteDown}></div>
        {modal}
      </div>
    );
  }
});

module.exports = VoteControls;
