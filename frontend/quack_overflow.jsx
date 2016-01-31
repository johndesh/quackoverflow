var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Header = require('./components/header');
var UserForm = require('./components/users/user_form');
var CurrentUserStore = require('./stores/current_user_store');
var SessionsApiUtil = require('./util/sessions_api_util');
var SessionForm = require('./components/sessions/new');
var QuestionsIndex = require('./components/questions/index');
var QuestionShow = require('./components/questions/question_show');
var QuestionForm = require('./components/questions/question_form');
var SearchResults = require('./components/search_results.jsx');
var App = React.createClass({
  render: function(){
    return (
      <div>
        <Header />
         <header className="main-header">
          	<div className="main-header-logo group">
          	  <a href="#">
          	  	Quack Overflow
          	  </a>
          	</div>
            <div className="main-header-nav group">
              <nav className="main-nav group">
                <ul>
                  <li className="group"><a>Questions</a></li>
                  <li className="group"><a>Jobs</a></li>
                  <li className="group"><a>Tags</a></li>
                  <li className="group"><a>Users</a></li>
                  <li className="group"><a>Badges</a></li>
                </ul>
              </nav>
              <nav className="ask-question-nav group">
                <ul>
                  <li><a href="#/questions/ask">Ask Question</a></li>
                </ul>
              </nav>
            </div>
         </header>
        <div className="main">
    	     {this.props.children}
        </div>
    </div>
    );
  }
});


var routes = (
  <Route path="/" component={App} >
    <IndexRoute component={QuestionsIndex}/>
    <Route path="search" component={SearchResults}/>
    <Route path="questions/ask" component={QuestionForm} onEnter={_ensureLoggedIn}/>
    <Route path="questions/:questionId" component={QuestionShow}/>
    <Route path="users/login" component={ SessionForm }/>
    <Route path="users/signup" component={ UserForm } />

  </Route>
);

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
};


  ReactDOM.render(
    <Router history={ReactRouter.broswerHistory}>{routes}</Router>,
    document.getElementById('content')
  );
