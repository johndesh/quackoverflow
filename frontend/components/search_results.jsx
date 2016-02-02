var React = require('react');
var SearchResultsStore = require('../stores/search_results_store');
var SearchApiUtil = require('../util/search_api_util');
var QuestionIndexItem = require('./questions/index_item');
var Spinner = require('./spinner');
var SearchResults = React.createClass({

  componentDidMount: function() {
    this.listener = SearchResultsStore.addListener(this._onChange);
    SearchApiUtil.search(this.state.query);
  },

  getInitialState: function () {
    var query = this.props.location.query;
    return {query: query.query, loading: false};
  },

  componentWillReceiveProps: function (newProps) {
    this.search(newProps.location.query.query);
  },

  _onChange: function() {
    this.forceUpdate();
  },

  search: function (query) {
    this.setState({loading: true});
    SearchApiUtil.search(query, function () {
      this.setState({loading: false});
    }.bind(this));
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
          {this.state.loading ? <Spinner spinnerName='three-bounce' /> : searchResults}
        </ul>
      </div>
    );
  }

});

module.exports = SearchResults;
