var SearchActions = require('../actions/search_actions');

var SearchApiUtil = {

  search: function (query) {
    $.ajax({
      url: '/api/search',
      type: 'GET',
      dataType: 'json',
      data: {query: query},
      success: function (data) {
        SearchActions.receiveResults(data);
      }
    });
  }

};

module.exports = SearchApiUtil;
