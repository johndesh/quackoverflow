var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var ApiUtil = require('./util/api_util');
var QuestionsIndex = require('./components/index');
var QuestionShow = require('./components/question_show');
var _handleClick = function(e) {
  e.preventDefault();
  $('.sub-header-nav').children('a').removeClass('clicked');
  $(e.currentTarget).addClass("clicked");
};

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
  <Route path="/" component={App}>
    <IndexRoute component={QuestionsIndex}/>
    <Route path="questions/:questionId" component={QuestionShow}/>
  </Route>
);

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('content')
);
