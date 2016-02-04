var React = require('react');
var Topbar = require('./topbar');
var History = require('react-router').History;

var App = React.createClass({
  mixins: [History],

  componentDidUpdate: function () {
    var pathKlass = "." + this.props.location.pathname.replace(/\//g, '-');
    $("a").removeClass("clicked");
    $("a").filter( $(pathKlass) ).addClass("clicked");
  },

  _handleClick: function (e) {
    e.preventDefault();
    this.history.pushState({}, e.target.name, {});
  },

  render: function(){
    return (
      <div>
        <Topbar />
         <header className="main-header">
          	<div className="main-header-logo group">
          	  <a name="/" onClick={this._handleClick}>
          	  	Quack Overflow
          	  </a>
          	</div>
            <div className="main-header-nav group">
              <nav className="main-nav group">
                <ul>
                  <li className="group"><a name="/questions" onClick={this._handleClick} className="-questions">Questions</a></li>
                  <li className="group"><a>Tags</a></li>
                  <li className="group"><a name="/users" onClick={this._handleClick} className="-users">Users</a></li>
                </ul>
              </nav>
              <nav className="ask-question-nav group">
                <ul>
                  <li><a name="/questions/ask" onClick={this._handleClick} className="-questions-ask">Ask Question</a></li>
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

module.exports = App;
