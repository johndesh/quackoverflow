var UserActions = require('../actions/user_actions');
var CurrentUserActions = require('../actions/current_user_actions');
var UsersApiUtil = {
  fetchUsers: function (cb) {
    $.ajax({
      url: '/api/users',
      type: 'GET',
      dataType: 'json',
      success: function (users) {
        UserActions.receiveUsers(users);
        cb && cb();
      }
    });
  },

  fetchUser: function (id, cb) {
    $.ajax({
      url: '/api/users/' + id,
      type: 'GET',
      dataType: 'json',
      success: function (user) {
        UserActions.receiveUser(user);
        cb && cb(user);
      }
    });
  },

  createUser: function (attrs, callback) {
    $.ajax({
      url: '/api/users',
      type: 'POST',
      dataType: 'json',
      data: attrs,
      success: function (user) {
        if (!user.errors) {
          UserActions.receiveUser(user);
        }
        callback && callback();
      }
    });
  },

  updateUser: function (formData, userId, cb) {

    $.ajax({
      url: '/api/users/' + userId,
      type: 'PATCH',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function (user) {
        if (!user.errors) {
          UserActions.receiveUser(user);
          CurrentUserActions.receiveCurrentUser(user);
        }
        cb && cb(user);
      }
    });
  }
};

module.exports = UsersApiUtil;
