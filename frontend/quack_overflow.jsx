var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var UserForm = require('./components/users/user_form');
var SessionForm = require('./components/sessions/new');
var QuestionsIndex = require('./components/questions/index');
var QuestionShow = require('./components/questions/question_show');

var App = React.createClass({
  render: function(){
    return (
      <div className="main">

    	  	{this.props.children}

      </div>
    );
  }
});

var routes = (
  <Route path="/" component={App} >
    <IndexRoute component={QuestionsIndex}/>
    <Route path="questions/:questionId" component={QuestionShow}/>
    <Route path="users/login" component={ SessionForm }/>
    <Route path="users/signup" component={ UserForm } />

  </Route>
);


  ReactDOM.render(
    <Router history={ReactRouter.broswerHistory}>{routes}</Router>,
    document.getElementById('content')
  );
