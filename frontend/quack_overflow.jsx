var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var ApiUtil = require('./util/api_util');
var Index = require('./components/index');

ReactDOM.render(
  <Index />,
  document.getElementById('content')
);
