var React = require('react');
var ReactRouter = require('react-router');
var QuestionStore = require('../stores/question');
var ApiUtil = require('../util/api_util');
var QuestionShow = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  mixins: [ReactRouter.browswerHistory],

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
    this._findQuestionById(this.props.params.questionId)

  },

  componentWillUnmount: function () {
    // this.questionListener.remove();
  },

  componentDidUpdate: function (oldProps) {
    debugger;
    var oldId = oldProps.params.questionId;
    var newId = this.props.params.questionId;
    if (newId !== oldId) {
      var question = this._findQuestionById(newId);
      this.setState({ question: question });
    }
  },


  render: function () {
    var Link = ReactRouter.Link;
    var answers = this.state.question.answers.map(function (answer, idx){
      return(
        <li className="answer" key={idx}>{answer.body}</li>
      );
    });
    var linkTo = "/questions/" + this.props.params.questionId
    return(
    <div className="question-index-wrapper">
      <div className="question-header">
        <h2>
          <Link to={linkTo} className="question-title group">{this.state.question.title}</Link>
        </h2>
      </div>
      <div className="question-wrapper">
        <div className="question">
          <p>{this.state.question.body}</p>
        </div>
      {answers}
       </div>
     </div>
    );
  }
});

module.exports = QuestionShow;
