var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var QuestionIndexItem = require('./questions/index_item');

var SearchResults = React.createClass({

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
    SearchApiUtil.search(this.state.query);
  },

  getInitialState: function () {

    var query = this.props.location.query;
    return query;
  },

  componentWillReceiveProps: function (newProps) {

    this.search(newProps.location.query.query)
  },

  _onChange: function() {

    this.forceUpdate();
  },

  search: function (query) {
      SearchApiUtil.search(query);
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

    var searchResults = SearchResultsStore.all().map(function (searchResult, idx) {
        return <QuestionIndexItem question={searchResult} key={idx}/>;
    });

    return (
      <div>
        <ul>
          {searchResults}
        </ul>
      </div>
    );
  },


});

module.exports = SearchResults;
