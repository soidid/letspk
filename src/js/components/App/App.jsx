/** @jsx React.DOM */

var React = require('react/addons');
var Story = require('../Story/Story.jsx');


var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

require('./App.css');

function getIssues() {
  return AppStore.getAll();
}

var App = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	data: []
    }
  },
 
  componentDidMount () {
    AppStore.addChangeListener(this._onChange);
    
  },
  
  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
  },

  _onChange (i, event) {
  	this.setState ({
      data: getIssues()
    });
  },

 
  render () {
  	var storyItems = this.state.data.map((item,index)=>{
         return (
              <Story data={item}
                     key={index}/>
          )

    });
    return (
      <div className="App">
        <div className="App-title">矛盾大對決。ほこ×たて</div>
        {storyItems}
        <div className="App-footer">矛盾大對決，好矛盾啊！ (ˊ● ω ●ˋ) そうだね～</div>
      </div>
    );
  }
});

module.exports = App;


