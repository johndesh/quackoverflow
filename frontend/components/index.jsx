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
      <div className="main">
        <div className="question-index-wrapper">
        <div className="sub-header">
          <h2 className="group">Top Questions</h2>
          <nav className="sub-header-nav group">
            <a className="clicked group">interesting</a>
            <a className="group">featured</a>
            <a className="group">hot</a>
            <a className="group">week</a>
            <a className="group">month</a>
          </nav>
        </div>
        <div className="question-index group">
          {questions}
        </div>
      </div>
    </div>
    );
  }
});

module.exports = Index;
