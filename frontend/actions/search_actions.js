var SearchConstants = require('../constants/search_constants');
var AppDispatcher = require('./../dispatcher/dispatcher');

var SearchActions = {
  receiveResults: function (data) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_SEARCH_RESULTS,
      searchResults: data.results
    });
  },

  receiveUserResults: function (data) {
    AppDispatcher.dispatch({
      actionType: SearchConstants.RECEIVE_USER_SEARCH_RESULTS,
      searchResults: data.results
    });
  }

};

module.exports = SearchActions;
