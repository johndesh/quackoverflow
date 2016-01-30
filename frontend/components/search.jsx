var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var QuestionIndexItem = require('./questions/index_item');

var Search = React.createClass({

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
  },

  getInitialState: function () {
    return {page: 1, query: ""};
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code === 13) {
      var query = e.target.value;
      SearchApiUtil.search(query, 1);
      this.setState({page: 1, query: query});
    } else {
      // do nothing
    }
  },

  nextPage: function () {
    var nextPage = this.state.page + 1;
    SearchApiUtil.search(this.state.query, nextPage);

    this.setState({page: nextPage});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {

    // var searchResults = SearchResultsStore.all().map(function (searchResult) {
    //   if (searchResult._type === "User") {
    //     return <UserIndexItem user={searchResult} />;
    //   } else {
    //     return <QuestionIndexItem question={searchResult} />;
    //   }
    // });

    return (
      <div>

      <input type="text" placeholder="Search Q&A" onKeyUp={ this.search } />

      </div>
    );
  },


});

module.exports = Search;
