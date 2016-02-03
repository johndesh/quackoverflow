var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var SearchConstants = require('../constants/search_constants');

var _searchResults = [];
var _userResults = [];
var _meta = {};

var SearchResultsStore = new Store(AppDispatcher);

SearchResultsStore.all = function () {
  return _searchResults.slice();
};

SearchResultsStore.allUsers = function () {
  return _userResults.slice();
};

SearchResultsStore.meta = function () {
  return _meta;
};

SearchResultsStore.__onDispatch = function (payload) {
  switch (payload.actionType) {

    case SearchConstants.RECEIVE_SEARCH_RESULTS:
      _searchResults = payload.searchResults;
      _meta = payload.meta;
      SearchResultsStore.__emitChange();
      break;

    case SearchConstants.RECEIVE_USER_SEARCH_RESULTS:
      _userResults = payload.searchResults;
      SearchResultsStore.__emitChange();
  }
};

module.exports = SearchResultsStore;
