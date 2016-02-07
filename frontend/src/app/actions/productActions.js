"use strict"
var AppDispatcher = require('../dispatcher/appDispatcher');
var ProductConstants = require('../constants/productConstants');

// Define actions object
var ProductActions = {

  receiveProduct: function(data) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_DATA,
      data: data
    })
  },

  receiveUser: function(data) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_USER,
      data: data
    })
  },

  receiveStatus: function(data) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_STATUS,
      data: data
    })
  }

};

module.exports = ProductActions;