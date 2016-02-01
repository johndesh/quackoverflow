var React = require('react');
var UsersStore = require('../../stores/users_store');
var UsersApiUtil = require('../../util/users_api_util');

var UserShow = React.createClass({
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
    UsersApiUtil.fetchUser(parseInt(this.props.params.userId));
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  render: function () {
    if(this.state.user === undefined) { return <div></div>; }

    return (
      <div>
        <h1>{this.state.user.username}</h1>
        <img src={this.state.user.avatar} />
      </div>
    );
  }
});

module.exports = UserShow;
