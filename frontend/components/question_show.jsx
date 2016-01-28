var React = require('react');
var ReactRouter = require('react-router');
var QuestionStore = require('../stores/question');
var ApiUtil = require('../util/api_util');
var QuestionShow = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  getInitialState: function () {
    var questionId = this.props.params.questionId;
    var question = this._findQuestionById(questionId) || {} ;
        return { question: question };
  },
  _findQuestionById: function (id) {
    var res;
     QuestionStore.all().forEach(function (question) {
      if (id == question.id) {
        res = question;
      }
    }.bind(this));
     ApiUtil.fetchQuestion(id);
     return res;
  },

  componentDidMount: function () {
    // this.questionListener = QuestionStore.addListener(this._questionsChanged);
    ApiUtil.fetchQuestion(this.props.params.questionId);
  },

  componentWillUnmount: function () {
    // this.questionListener.remove();
  },

  _questionsChanged: function () {
    debugger;
    var questionId = this.props.params.questionId;
    var question = this._findQuestionById(questionId);
    this.setState({ question: question });

  },


  render: function () {
    var Link = ReactRouter.Link;
    var answers = this.state.question.answers.map(function (answer, idx){
      return(
        <li className="answer" key={idx}>{answer.body}</li>
      );
    });
    return(
      <div className="question-wrapper">
        <div className="question">
          <Link to="/" >Back to Questions</Link>
          <h1>{this.state.question.title}</h1>
          <p>{this.state.question.body}</p>
        </div>
      {answers}
       </div>
    );
  }
});

module.exports = QuestionShow;
