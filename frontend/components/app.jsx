var React = require('react');
var Header = require('./header');

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

module.exports = App;
