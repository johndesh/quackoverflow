var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;
var UserForm = require('./components/users/user_form'),
    UserIndex = require('./components/users/index'),
    UserShow = require('./components/users/user_show'),
    CurrentUserStore = require('./stores/current_user_store'),
    SessionsApiUtil = require('./util/sessions_api_util'),
    SessionForm = require('./components/sessions/new'),
    QuestionsIndex = require('./components/questions/index'),
    QuestionShow = require('./components/questions/question_show'),
    QuestionForm = require('./components/questions/question_form'),
    SearchResults = require('./components/search_results.jsx'),
    App = require('./components/app');

function _ensureLoggedIn(nextState, replace, callback) {
  if (CurrentUserStore.userHasBeenFetched()) {
    _redirectIfNotLoggedIn();
  } else {
    SessionsApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  }

  function _redirectIfNotLoggedIn() {
    if (!CurrentUserStore.isLoggedIn()) {
      replace({}, "/users/login", {returnUri: "questions/ask"});
    }
    callback();
  }
}

var routes = (
  <Route path="/" component={App} >

    <IndexRoute component={QuestionsIndex} />
    <Route path="search" component={SearchResults} />
    <Route path="questions/ask" component={QuestionForm} onEnter={_ensureLoggedIn} />
    <Route path="questions/" component={QuestionsIndex} />
    <Route path="questions/:questionId" component={QuestionShow} />
    <Route path="users/login" component={ SessionForm } />
    <Route path="users/signup" component={ UserForm } />
    <Route path="users/" component={ UserIndex } />
    <Route path="users/:userId" component={ UserShow }/>

  </Route>
);

  ReactDOM.render(
    <Router history={ReactRouter.broswerHistory}>{routes}</Router>,
    document.getElementById('content')
  );
