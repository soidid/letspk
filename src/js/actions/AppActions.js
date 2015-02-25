var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
/**
 * 這是一個 singleton 物件
 */
var AppActions = {

  create: function(item) {

    //定義每個 action 要送出去的資料
    AppDispatcher.dispatch({
      actionType: AppConstants.ISSUE_CREATE,
      item: item
    });
  },

  update: function(item) {
    
    AppDispatcher.dispatch({
      actionType: AppConstants.ISSUE_UPDATE,
      item: item
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
       actionType: AppConstants.ISSSUE_DESTROY,
      id: id
    });
  }

};

module.exports = AppActions;
