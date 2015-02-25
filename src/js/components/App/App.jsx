/** @jsx React.DOM */

var React = require('react/addons');
var Story = require('../Story/Story.jsx');


var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

require('./App.css');


var App = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	
    }
  },
  
  // componentDidMount () {
  //   AppStore.addChangeListener(this._onChange);
    
  // },
  
  // componentWillUnmount () {
  //   AppStore.removeChangeListener(this._onChange);
  // },

  _onClick (i, event) {
  	
  },

 
  render () {
  	
    return (
      <div className="App">
        <Story />
      </div>
    );
  }
});

module.exports = App;


