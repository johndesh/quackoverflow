var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var _users = {};
var CHANGE_EVENT = "change";

var _addUser = function (newUser) {
  _users[newUser.id] = newUser;
};

var resetUsers = function (users) {
  _users = {};

  users.forEach(function (user) {
    _users[user.id] = user;
  });
};

var UsersStore = new Store(AppDispatcher);

UsersStore.all = function () {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UsersStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case UserConstants.RECEIVE_USERS:
      resetUsers(payload.users);
      UsersStore.__emitChange();
      break;

    case UserConstants.RECEIVE_USER:
      _addUser(payload.user);
      UsersStore.__emitChange();
      break;
  }
};

UsersStore.find = function (id) {
  return _users[id];
};

module.exports = UsersStore;
