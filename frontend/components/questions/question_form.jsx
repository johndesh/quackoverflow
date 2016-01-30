var React = require('react');
var QuestionsApiUtil = require('../../util/questions_api_util');
var History = require('react-router').History;


var QuestionForm = React.createClass({
  mixins: [History],

  getInitialState: function () {
    return { title: "", body: "" };
  },

  createQuestion: function (e) {
    e.preventDefault();
    var question = $(e.currentTarget).serializeJSON();
    QuestionsApiUtil.createQuestion(question, function (id) {
      this.history.pushState(null, "/questions/" + id, {});
    }.bind(this));
  },

  render: function () {
    return (
      <form className="new-question" onSubmit={this.createQuestion}>
        <label>
          Title
          <input type="text" name="title" />
        </label>
        <label>
          Question
          <textarea name="body"></textarea>
        </label>
        <button>Ask Question</button>
      </form>
    );
  }

});

module.exports = QuestionForm;
