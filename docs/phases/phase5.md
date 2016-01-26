# Phase 5: Votes

## Rails
### Models
* QuestionVote

### Controllers
* Api::QuestionVotesController (create, destroy)

### Views


## Flux
### Views (React Components)

### Stores
* QuestionVote

### Actions
* ApiActions.receiveAllQuestionVotes -> triggered by ApiUtil
* ApiActions.deleteQuestionVote
* QuestionVoteActions.fetchAllQuestionVotes -> triggers ApiUtil
* QuestionVoteActions.createQuestionVote
* QuestionVoteActions.destroyQuestionVote

### ApiUtil
* ApiUtil.fetchAllQuestionVotes
* ApiUtil.createQuestionVote
* ApiUtil.destroyQuestionVote

## Gems/Libraries
