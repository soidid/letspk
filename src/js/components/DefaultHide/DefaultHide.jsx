/** @jsx React.DOM */

var React = require('react');
var Story = require('../Story/Story.jsx');

require('./DefaultHide.css');

var DefaultHide = React.createClass({
  render () {
    
  	switch(this.props.show){
  		
  		case false:
  		
  		return (
            <div className="DefaultHide"></div>
        );
  		break;

  		case true:
  		
  		return (
            <div className="DefaultHide is-show">
              <div className="DefaultHide-topControl ">
                  <button className="DefaultHide-button"
                          onClick={this.props.handleClick}
                          >回到列表</button>
              </div>
              <Story data={this.props.data} 
                     detailVersion={true}/>
              
            	
              <div>Some detail data here</div>
            </div>
        );
  		break;

  	}
  	
    
  }
});

module.exports = DefaultHide;


