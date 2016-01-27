var React = require('react');
var QuestionStore = require('../stores/question');
var ApiUtil = require('../util/api_util');
var IndexItem = require('./index_item');
var Index = React.createClass({
  getInitialState: function () {
    return {questions: QuestionStore.all()};
  },

  _questionsChanged: function () {
    this.setState({questions: QuestionStore.all()});
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._questionsChanged);
    ApiUtil.fetchQuestions();
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  handleItemClick: function (question) {
    this.props.history.pushState(null, "/questions/" + question.id);
  },

  render: function () {
    var handleItemClick = this.handleItemClick;
    var questions = this.state.questions.map(function (question, idx) {
      var boundClick = handleItemClick.bind(null, question);
      return (
        <IndexItem key={idx} question={question} onClick={boundClick}/>
      );
    });

    return (
      <div className="question-index group">
        {questions}
      </div>
    );
  }
});

module.exports = Index;
