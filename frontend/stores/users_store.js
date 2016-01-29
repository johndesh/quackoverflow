var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var _users = [];
var CHANGE_EVENT = "change";

var _addUser = function (newUser) {
  _users.unshift(newUser);
};

var UsersStore = new Store(AppDispatcher);

UsersStore.all = function () {
  return _users.slice();
};

UsersStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case UserConstants.RECEIVE_USERS:
      _users = payload.users;
      UsersStore.__emitChange();
      break;

    case UserConstants.RECEIVE_USER:
      _addUser(payload.user);
      UsersStore.__emitChange();
      break;
  }
};

UsersStore.findUserById = function (id) {
  for (var i = 0; i < _users.length; i++) {
    if (_users[i].id === id) {
      return _users[i];
    }
  }
  return;
};

module.exports = UsersStore;
