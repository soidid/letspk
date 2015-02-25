/** @jsx React.DOM */

var React = require('react/addons');

require('./Story.css');

var Story = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	
    }
  },

  render () {
  	
    return (
      <div className="Story">
      Story
      </div>
    );
  }
});

module.exports = Story;


