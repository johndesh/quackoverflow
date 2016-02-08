var React = require('react');
var ReactRouter = require('react-router');
var History = require('react-router').History;
var QuestionStore = require('../../stores/question');
var QuestionsApiUtil = require('../../util/questions_api_util');
var QuestionAnswersForm = require('./question_answers_form');
var QuestionAnswer = require('./question_answer');
var VoteControls = require('../vote_controls');
var QuestionShow = React.createClass({
  mixins: [History],

  getStateFromStore: function () {
    return { question: QuestionStore.find(parseInt(this.props.params.questionId))};
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
      var questionId = this.state.question.id;
      answers = this.state.question.answers.map(function (answer, idx){
        return(
          <QuestionAnswer answer={answer} key={idx} votePath={'/api/questions/' + questionId + '/answers/' + answer.id + '/vote'}/>
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
      <div className="question-wrapper">
        <div className="vote group">
          <VoteControls voteValue={this.state.question.userVoteValue} voteCount={this.state.question.votes} votePath={'/api/' + this.props.location.pathname + '/vote'} />
        </div>
        <div className="question markdown-body">
          <p dangerouslySetInnerHTML={{__html: this.state.question.body}}></p>
        </div>
      </div>
      <div className="answers-wrapper group">
        <div className="answers-header">
          <h2>
            {answers.length} Answer{answers.length === 1 ? '' : 's'}
          </h2>
        </div>
        {answers}
      </div>
       <QuestionAnswersForm questionId={this.props.params.questionId} />
     </div>
    );
  }
});

module.exports = QuestionShow;
