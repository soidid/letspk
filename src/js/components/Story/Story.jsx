/** @jsx React.DOM */

var React = require('react/addons');
var AppActions = require('../../actions/AppActions');

require('./Story.css');

var Story = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
      showDetail: false
    	
    }
  },

  _onVote (i, event) {
    //console.log(i);
    AppActions.update(i);

  },

  _toggleDetail () {
    this.setState({
      showDetail: !this.state.showDetail
    });
  },

  render () {
    
    var {
      index,
      title,
      sideA,
      sideB
    } = this.props.data;

    if(!sideA) return  (<div></div>);



  	var sideAImg = require(sideA.imgURL);
    var sideBImg = require(sideB.imgURL);

    var styleA = {width: Math.min(100, sideA.voteCount/100 * 100) + "%" };
    var styleB = {width: Math.min(100, sideB.voteCount/100 * 100) + "%" };

    var boundClickA = this._onVote.bind(null, {id: index, side: "sideA", obj: sideA});
    var boundClickB = this._onVote.bind(null, {id: index, side: "sideB", obj: sideB});
    
    var detailToggleItem = this.state.showDetail ? "隱藏詳細" : "詳細請求";

    var detailItemA = this.state.showDetail ? 
    <div className="Story-detail is-show"> {sideA.detail} </div> : 
    <div className="Story-detail"></div>;

    var detailItemB = this.state.showDetail ? 
    <div className="Story-detail is-show"> {sideB.detail} </div> : 
    <div className="Story-detail"></div>;

    return (

      <div className="Story">
          <div className="Story-title">
              <div className="Story-titleMain">#{index} {title}</div>
              <div className="Story-toggleMore"
                   onClick={this._toggleDetail}>{detailToggleItem}</div>

          </div>

          <div className="Story-fighterCard Story-fighterCard--withBorder">
            <div className="Story-fighterCardTitle">
                <div>{sideA.name}</div>
                <div className="Story-fighterCardSub">{sideA.sub}</div>
            </div>
            <div className="Story-fighterImgWrapper">
                <img className="Story-fighterImg Story-fighterImgA"
                     src={sideAImg} />
            </div>
            <div className="Story-fighterStatement">
                {sideA.statement}
                {detailItemA}
            </div>
            

            
          </div>

        
          <div className="Story-fighterCard">
            <div className="Story-fighterCardTitle">
                <div>{sideB.name}</div>
                <div className="Story-fighterCardSub">{sideB.sub}</div>
            </div>
            <div className="Story-fighterImgWrapper">
                <img className="Story-fighterImg Story-fighterImgB"
                     src={sideBImg} />
            </div>
            <div className="Story-fighterStatement">
                {sideB.statement}
                {detailItemB}
            </div>

            
          </div>
          

          <div className="Story-bottom">
            <div className="Story-fighterCard Story-fighterCard--withBorder">
            <div className="Story-progressWrapper">
                <div className="Story-votesA">{sideA.voteCount}</div>      
                <div className="Story-progressBar Story-progressBar--floatRight"
                     style={styleA} />
            </div>
            <div className="Story-action"
                 onClick={boundClickA}>VOTE</div>
            </div>

            <div className="Story-fighterCard">
            <div className="Story-progressWrapper">
                <div className="Story-votesB">{sideB.voteCount}</div>
                <div className="Story-progressBar"
                     style={styleB} />
            </div>
            <div className="Story-action"
                 onClick={boundClickB}>VOTE</div>
            </div>
          </div>

          <div className="Story-pk"><div className="Story-pkCircle">PK</div></div>
          

      </div>
    );
  }
});

module.exports = Story;


