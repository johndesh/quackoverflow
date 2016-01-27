var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ApiUtil = require('./util/api_util');
var Index = require('./components/index');
var _handleClick = function(e) {
  e.preventDefault();
  $('.sub-header-nav').children('a').removeClass('clicked');
  $(e.target).addClass("clicked");
};

ReactDOM.render(	
  <div className="main">
    <div className="question-index-wrapper">
	    <div className="sub-header">
	      <h2 className="group">Top Questions</h2>
	      <nav className="sub-header-nav group">
	        <a href="#" onClick={_handleClick} className="clicked group">interesting</a>
	        <a href="#" onClick={_handleClick} className="group">featured</a>
	        <a href="#" onClick={_handleClick} className="group">hot</a>
	        <a href="#" onClick={_handleClick} className="group">week</a>
	        <a href="#" onClick={_handleClick} className="group">month</a>
	      </nav>
	    </div>
	  	<Index />
  	</div>
  </div>,
  document.getElementById('content')
);
