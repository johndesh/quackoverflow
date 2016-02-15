var React = require('react');
var QuestionStore = require('../../stores/question');
var History = require('react-router').History;
var QuestionsApiUtil = require('../../util/questions_api_util');
var IndexItem = require('./index_item');
var Index = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return {questions: QuestionStore.all()};
  },

  _questionsChanged: function () {
    this.setState({questions: QuestionStore.all()});
  },

  componentDidUpdate: function () {

  },


  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._questionsChanged);

    QuestionsApiUtil.fetchQuestions();
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  _applyFilter: function (filter) {
    QuestionsApiUtil.filterQuestions(function(questions) {
      this.setState({questions: questions});
    }.bind(this), filter);
  },

  _handleClick: function(e) {
    e.preventDefault();
    this._applyFilter($(e.target).data('filter'));
    $('.sub-header-nav').children('a').removeClass('clicked');
    $(e.currentTarget).addClass("clicked");
  },

  render: function () {
    if (this.state.questions === undefined) {
      return <div></div>;
    }
    var questions = this.state.questions.map(function (question, idx) {
      return (
        <IndexItem key={idx} question={question} />
      );
    });



    return (
      <div className="question-index-wrapper">
        <div className="sub-header">
          <h2 className="group">Top Questions</h2>
          <nav className="sub-header-nav group">
            <a data-filter="" onClick={this._handleClick} className="clicked group">new</a>
            <a data-filter="views" onClick={this._handleClick} className="group">interesting</a>
            <a data-filter="votes" onClick={this._handleClick} className="group">hot</a>
          </nav>
        </div>
        <div className="question-index group">
          {questions}
        </div>
      </div>
    );
  }
});

module.exports = Index;
