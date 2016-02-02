var React = require('react');
var Topbar = require('./topbar');

var App = React.createClass({

  componentDidUpdate: function () {
    var pathKlass = "." + this.props.location.pathname.replace(/\//g, '-');
    $("a").removeClass("clicked");
    $("a").filter( $(pathKlass) ).addClass("clicked");
  },

  toggleNavButton: function (e) {
    $(".main-header-nav a").removeClass("clicked");
    $(e.currentTarget).addClass("clicked");
  },

  render: function(){
    return (
      <div>
        <Topbar />
         <header className="main-header">
          	<div className="main-header-logo group">
          	  <a href="#">
          	  	Quack Overflow
          	  </a>
          	</div>
            <div className="main-header-nav group">
              <nav className="main-nav group">
                <ul>
                  <li className="group"><a href="#/questions/" className="-questions-">Questions</a></li>
                  <li className="group"><a>Tags</a></li>
                  <li className="group"><a href="#/users/" className="-users-">Users</a></li>
                </ul>
              </nav>
              <nav className="ask-question-nav group">
                <ul>
                  <li><a href="#/questions/ask" className="-questions-ask">Ask Question</a></li>
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
