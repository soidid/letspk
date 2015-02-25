// Store 是資料改變的地方，single source of truth，指的就是所有的狀態都應該被保存在 store
var AppDispatcher = require('../dispatcher/AppDispatcher');

// 需要 dispatcher，因為 dispatcher 廣播不同的東西，store 必須 reigster 並且決定如何處理
var AppConstants = require('../constants/AppConstants');

// 因為 store 改變之後要通知 view，所以需要有廣播的能力
var EventEmitter = require('events').EventEmitter;

// 讓 store 繼承 EventEmitter 一樣有幾種不同寫法，merge, assign 或是 jQuery 的 .$extend
var merge = require('react/lib/merge');
var assign = require('object-assign');

// store 改變之後廣播出去的內容
var CHANGE_EVENT = 'change';

var Firebase = require('firebase');


// Store 分成三個大部分：private, public, register self

//========================================================================
//
// Private vars & method

// 定義 store 需要的變數和 method，外界看不到

var _issues = {};

function _create(item) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  var timestamp = new Date().getTime();
  
  _issues[id]= assign({}, item, {id: id});
  // var ref = new Firebase('https://issuesharing.firebaseio.com/issues/'+id);
  //     ref.set(assign({}, item, {id: id, timestamp: timestamp}), function() {
  //         console.log("New Book Added:"+item.title);
  //     });

}

//利用 assign 做部分 update
//updates 為需要更新的部分, {key: value}
//assign (target, ...sources)
function _update(id, side, newCount) {
  //_issues[id] = assign({}, _issues[id], updates);
  var ref = new Firebase('https://letspk.firebaseio.com/issues/'+id+'/'+side);
      ref.update({
        voteCount: newCount
      });
}

function _destroy(id) {
  delete _issues[id]
  //var ref = new Firebase('https://issuesharing.firebaseio.com/issues/'+id);
  //ref.remove();
}
function _resetSelection(){
  _selection = {};

}


//========================================================================
//
// Public API 外界可以呼叫的方法

var AppStore = merge(EventEmitter.prototype, {
// assign 的寫法
// var TodoStore = assign({}, EventEmitter.prototype, {

  getAll: function() {
    return _issues;
  },

  getSelection: function() {
    return _selection;
  },
  
  //為什麼這個要定義成 public ?
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  


});

//========================================================================
//
// Load initial data

var ref = new Firebase('https://letspk.firebaseio.com/issues');
ref.on('value', function(snap) {
  var objects = snap.val();
  var items = [];
  var sorted = [];

  for(var key in objects){
    items.push(objects[key]);
  }

  sorted = items.sort(function(a,b){
    return b.timestamp - a.timestamp;
  })

  _issues = sorted;
  //console.log("Load data from firebase:");
  //console.log(_issues);
  //emit change here
  AppStore.emitChange();

});

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 */

AppDispatcher.register(function(action) {
  

  switch(action.actionType) {
    
    // case AppConstants.ISSUE_CREATE:
    //   title = action.item.title.trim();
    //   if (title !== '') {
    //     //用 private 方法處理，更新資料/真理
    //     _create(action.item);
    //   }
    //   AppStore.emitChange();
    //   break;

    case AppConstants.ISSUE_UPDATE:
      
      var newCount = action.item.obj.voteCount+1;

      _update(action.item.id, action.item.side, newCount);
      AppStore.emitChange();

      break;

    

    default:
      // no op
  }
});

module.exports = AppStore;
