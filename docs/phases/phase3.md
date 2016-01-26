# Phase 3: QuestionAnswers and Tags (2 days)

## Rails
### Models
* QuestionAnswer
* Tag
* Tagging

### Controllers
* Api::QuestionAnswersController (create, destroy, index, show, update)

### Views
* question/answers/index.json.jbuilder
* question/answers/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* QuestionAnswersIndex
  - QuestionAnswerIndexItem
* QuestionAnswerForm
* SearchIndex

### Stores
* Notebook

### Actions
* ApiActions.receiveAllQuestionAnswers -> triggered by ApiUtil
* ApiActions.receiveSingleQuestionAnswer
* ApiActions.deleteQuestionAnswer
* QuestionAnswerActions.fetchAllQuestionAnswers -> triggers ApiUtil
* QuestionAnswerActions.fetchSingleQuestionAnswer
* QuestionAnswerActions.createQuestionAnswer
* QuestionAnswerActions.editQuestionAnswer
* QuestionAnswerActions.destroyQuestionAnswer

### ApiUtil
* ApiUtil.fetchAllQuestionAnswers
* ApiUtil.fetchSingleQuestionAnswer
* ApiUtil.createQuestionAnswer
* ApiUtil.editQuestionAnswer
* ApiUtil.destroyQuestionAnswer

## Gems/Libraries
