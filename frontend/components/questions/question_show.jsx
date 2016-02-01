var React = require('react');
var ReactRouter = require('react-router');
var QuestionStore = require('../../stores/question');
var QuestionsApiUtil = require('../../util/questions_api_util');
var QuestionShow = React.createClass({

  getStateFromStore: function () {

    return { question: QuestionStore.find(parseInt(this.props.params.questionId)) };
  },

  _onChange: function () {

    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentWillReceiveProps: function (newProps) {

    QuestionsApiUtil.fetchSingleQuestion(parseInt(newProps.params.questionId));
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    QuestionsApiUtil.fetchSingleQuestion(parseInt(this.props.params.questionId));
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },

  render: function () {
    if(this.state.question === undefined) { return <div></div>; }
    var Link = ReactRouter.Link;
    var answers;
    if (this.state.question.answers) {
      answers = this.state.question.answers.map(function (answer, idx){
        return(
          <li className="answer" key={idx}>{answer.body}</li>
        );
      });
    } else {
      answers = <div></div>;
    }
    var linkTo = "/questions/" + this.props.params.questionId;
    return(
    <div className="question-index-wrapper">
      <div className="question-header">
        <h2>
          <Link to={linkTo} className="question-title group">{this.state.question.title}</Link>
        </h2>
      </div>
      <div className="question-wrapper markdown-body">
        <div className="question">
          <p dangerouslySetInnerHTML={{__html: this.state.question.body}}></p>
        </div>
      {answers}
       </div>
     </div>
    );
  }
});

module.exports = QuestionShow;
