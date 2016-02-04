var React = require('react');
var History = require('react-router').History;

var UserIndexItem = React.createClass({
  mixins: [History],

  showUser: function () {
    this.history.pushState({}, "/users/" + this.props.user.id + "/" + this.props.user.username);
  },

  render: function () {
    var user = this.props.user;

    var location = (user.city && user.country) ? user.city + ", " + user.country : "";

    return(
      <div className="user-item group">
        <div className="user-info">
          <div className="user-avatar-thumb group">
            <img src={user.avatar} />
          </div>
          <div className="user-details group">
            <a onClick={this.showUser}>{user.username}</a>
            <span className="user-location">{location}</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = UserIndexItem;
