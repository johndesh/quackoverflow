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

  render: function () {
    var questions = this.state.questions.map(function (question, idx) {
      return (
        <IndexItem key={idx} question={question}/>
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
