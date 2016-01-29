"use strict"
let AppDispatcher = require('../dispatcher/appDispatcher');
let ProductConstants = require('../constants/productConstants');

// Define actions object
let ProductActions = {

  // Receive inital product data
  receiveProduct: function(data) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_DATA,
      data: data
    })
    // console.log(data);
  },

  receiveLocation: function(data) {

    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_LOCATION,
      data: data
    })
    // console.log(data);
  },

  receiveUser: function(data) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_USER,
      data: data
    })
    // console.log(data);
  },

  receiveStatus: function(data) {
    AppDispatcher.handleAction({
      actionType: ProductConstants.RECEIVE_STATUS,
      data: data
    })
    // console.log(data);
  }

};

module.exports = ProductActions;