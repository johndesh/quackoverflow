var SearchActions = require('../actions/search_actions');

var SearchApiUtil = {

  search: function (query, callback) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query},
      success: function (data) {
        SearchActions.receiveResults(data);
        callback && callback();
      }
    });
  },

  searchUsers: function(query, callback) {
    $.ajax({
      url: '/api/search/users',
      type: 'GET',
      dataType: 'json',
      data: {query: query},
      success: function (data) {
        SearchActions.receiveUserResults(data);
        callback && callback();
      }
    });
  }

};

module.exports = SearchApiUtil;
