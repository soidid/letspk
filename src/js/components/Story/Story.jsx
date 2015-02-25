/** @jsx React.DOM */

var React = require('react/addons');
var AppActions = require('../../actions/AppActions');

require('./Story.css');

var Story = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
    	
    }
  },

  _onVote (i, event) {
    //console.log(i);
    AppActions.update(i);

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

    var styleA = {width: sideA.voteCount/100 * 100 + "%" };
    var styleB = {width: sideB.voteCount/100 * 100 + "%" };

    var boundClickA = this._onVote.bind(null, {id: index, side: "sideA", obj: sideA});
    var boundClickB = this._onVote.bind(null, {id: index, side: "sideB", obj: sideB});

    return (

      <div className="Story">
          <div className="Story-title">
              <div>#{index} {title}</div>
              <div className="Story-toggleMore">詳細請求</div>

          </div>

          <div className="Story-figherCard Story-figherCard--withBorder">
            <div className="Story-figherCardTitle">
                <div>{sideA.name}</div>
                <div className="Story-figherCardSub">{sideA.sub}</div>
            </div>
            <div className="Story-figherImgWrapper">
                <img className="Story-figherImg Story-figherImgA"
                     src={sideAImg} />
            </div>
            <div className="Story-figherStatement">
                {sideA.statement}
            </div>

            
            <div className="Story-progressWrapper">
                <div className="Story-votesA">{sideA.voteCount}</div>      
                <div className="Story-progressBar Story-progressBar--floatRight"
                     style={styleA} />
            </div>
            <div className="Story-action"
                 onClick={boundClickA}>VOTE</div>
          </div>

        
          <div className="Story-figherCard">
            <div className="Story-figherCardTitle">
                <div>{sideB.name}</div>
                <div className="Story-figherCardSub">{sideB.sub}</div>
            </div>
            <div className="Story-figherImgWrapper">
                <img className="Story-figherImg Story-figherImgB"
                     src={sideBImg} />
            </div>
            <div className="Story-figherStatement">
                {sideB.statement}
            </div>

            <div className="Story-progressWrapper">
                <div className="Story-votesB">{sideB.voteCount}</div>
                <div className="Story-progressBar"
                     style={styleB} />
            </div>
            <div className="Story-action"
                 onClick={boundClickB}>VOTE</div>
          </div>

          <div className="Story-pk"><div className="Story-pkCircle">PK</div></div>
          

      </div>
    );
  }
});

module.exports = Story;


