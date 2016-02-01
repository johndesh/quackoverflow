var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var UserForm = require('./components/users/user_form');
var UserIndex = require('./components/users/index');
var UserShow = require('./components/users/user_show');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var SessionForm = require('./components/sessions/new');
var QuestionsIndex = require('./components/questions/index');
var QuestionShow = require('./components/questions/question_show');
var QuestionForm = require('./components/questions/question_form');
var SearchResults = require('./components/search_results.jsx');
var App = require('./components/app');

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

    <IndexRoute component={QuestionsIndex}/>
    <Route path="search" component={SearchResults}/>
    <Route path="questions/ask" component={QuestionForm} onEnter={_ensureLoggedIn}/>
    <Route path="questions/:questionId" component={QuestionShow}/>
    <Route path="users/login" component={ SessionForm }/>
    <Route path="users/signup" component={ UserForm } />
    <Route path="users/" component={ UserIndex } />
    <Route path="users/:userId" component={ UserShow }/>

  </Route>
);

  ReactDOM.render(
    <Router history={ReactRouter.broswerHistory}>{routes}</Router>,
    document.getElementById('content')
  );
