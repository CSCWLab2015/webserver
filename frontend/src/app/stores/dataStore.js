var AppDispatcher = require('../dispatcher/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var ProductConstants = require('../constants/productConstants');
var _ = require('underscore');
var cookie = require('react-cookie');


// Define initial data points
var _product = {};
var _tag = {};
var _status = {};
var _location = {};
var _user = {};

// Method to load product data from mock API
function loadProductData(data) {
  _product = data;
}

function loadTag(data) {
  _tag = data;
}

function loadStatus(data) {
  _status = data;
}

function loadUser(data) {
  if (data.role) {
    cookie.save('dat_role', data.role);
    cookie.save('is_loggedin', true);
    _user = {};
  }
  else _user = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ProductStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getProduct: function() {
    return _product;
  },

  getUser: function() {
    return _user;
  },

  getStatus: function() {
    return _status;
  },

  getLogin: function() {
    var _status = cookie.load('is_loggedin');
    var _role = cookie.load('dat_role');
    var login = { status: _status, role: _role};
    return login;
  },

  getToken: function() {
    var _token = cookie.load('dat_token');
    return _token;
  },

  logout: function() {
    cookie.remove('dat_role');
    cookie.remove('is_loggedin');
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case ProductConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;

    case ProductConstants.RECEIVE_LOCATION:
      loadLocation(action.data);
      break;

    case ProductConstants.RECEIVE_USER:
      loadUser(action.data);
      break;

    case ProductConstants.RECEIVE_STATUS:
      loadStatus(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ProductStore.emitChange();

  return true;

});

module.exports = ProductStore;