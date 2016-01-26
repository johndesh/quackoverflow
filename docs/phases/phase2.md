# Phase 2: Flux Architecture and Question CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* QuestionsIndex
  - QuestionsIndexItem
* QuestionForm

### Stores
* Question

### Actions
* ApiActions.receiveAllQuestions -> triggered by ApiUtil
* ApiActions.receiveSingleQuestion
* ApiActions.deleteQuestion
* QuestionActions.fetchAllQuestions -> triggers ApiUtil
* QuestionActions.fetchSingleQuestion
* QuestionActions.createQuestion
* QuestionActions.editQuestion
* QuestionActions.destroyQuestion

### ApiUtil
* ApiUtil.fetchAllQuestions
* ApiUtil.fetchSingleQuestion
* ApiUtil.createQuestion
* ApiUtil.editQuestion
* ApiUtil.destroyQuestion

## Gems/Libraries
* Flux Dispatcher (npm)
