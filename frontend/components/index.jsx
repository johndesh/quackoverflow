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
    var _handleClick = function(e) {
      e.preventDefault();
      $('.sub-header-nav').children('a').removeClass('clicked');
      $(e.currentTarget).addClass("clicked");
    };


    return (
      <div className="question-index-wrapper">
        <div className="sub-header">
          <h2 className="group">Top Questions</h2>
          <nav className="sub-header-nav group">
            <a href="#" onClick={_handleClick} className="clicked group">interesting</a>
            <a href="#" onClick={_handleClick} className="group">featured
              <span className="featured-count-tab group">391</span></a>
            <a href="#" onClick={_handleClick} className="group">hot</a>
            <a href="#" onClick={_handleClick} className="group">week</a>
            <a href="#" onClick={_handleClick} className="group">month</a>
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
