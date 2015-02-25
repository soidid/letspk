/** @jsx React.DOM */

var React = require('react/addons');
var Story = require('../Story/Story.jsx');
var DefaultHide = require('../DefaultHide/DefaultHide.jsx');

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
    	data: [],
      showDetail: false,
      showDetailItem: {}
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

  _toggleDefaultHide (i, event) {
    this.setState({
      showDetail: !this.state.showDetail,
      showDetailItem: i
    });

  },

 
  render () {
  	var storyItems = this.state.data.map((item,index)=>{
         var boundClick = this._toggleDefaultHide.bind(null,item);
         return (
              <Story data={item}
                     key={index}
                     handleClick={boundClick} />
          )

    });

    //NEEDS patch
    var classes = this.state.showDetail ? "App--limitedHeight" : "App";

    return (
      <div className={classes}>
        <div className="App-title">矛盾大對決。ほこ×たて</div>
        <div className="App-subTitle">矛盾大對決，好矛盾啊！ (ˊ● ω ●ˋ) そうだね～</div>
        {storyItems}
        <DefaultHide show={this.state.showDetail}
                     handleClick={this._toggleDefaultHide}
                     data={this.state.showDetailItem}/>
        
      </div>
    );
  }
});

module.exports = App;


