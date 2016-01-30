var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var Header = require('./components/header');
var UserForm = require('./components/users/user_form');
var SessionForm = require('./components/sessions/new');
var QuestionsIndex = require('./components/questions/index');
var QuestionShow = require('./components/questions/question_show');
var SearchResults = require('./components/search_results.jsx')
var App = React.createClass({
  render: function(){
    return (
      <div>
        <Header />
         <header className="main-header">
          	<div className="main-header-logo group">
          	  <a href="/">
          	  	Quack Overflow
          	  </a>
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
    <Route path="questions/:questionId" component={QuestionShow}/>
    <Route path="users/login" component={ SessionForm }/>
    <Route path="users/signup" component={ UserForm } />

  </Route>
);


  ReactDOM.render(
    <Router history={ReactRouter.broswerHistory}>{routes}</Router>,
    document.getElementById('content')
  );
