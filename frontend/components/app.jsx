var React = require('react');
var Header = require('./header');

var App = React.createClass({
  toggleNavButton: function (e) {
    $(".main-header-nav a").removeClass("clicked");
    $(e.currentTarget).addClass("clicked");
  },

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
                  <li className="group"><a onClick={this.toggleNavButton}>Questions</a></li>
                  <li className="group"><a onClick={this.toggleNavButton}>Tags</a></li>
                  <li className="group"><a onClick={this.toggleNavButton} href="#/users/">Users</a></li>
                </ul>
              </nav>
              <nav className="ask-question-nav group">
                <ul>
                  <li><a onClick={this.toggleNavButton} href="#/questions/ask">Ask Question</a></li>
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
