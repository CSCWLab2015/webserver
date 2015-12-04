let AppDispatcher = require('../dispatcher/appDispatcher');
let EventEmitter = require('events').EventEmitter;
let ProductConstants = require('../constants/productConstants');
let _ = require('underscore');
let cookie = require('react-cookie');


// Define initial data points
let _product = {};
let _tag = {};
let _fingerprint = {};
let _location = {};
let _user = {};

// Method to load product data from mock API
function loadProductData(data) {
  _product = data;
}

function loadTag(data) {
  _tag = data;
  // console.log(data);
}

function loadFP(data) {
  _fingerprint = data;
}

function loadLocation(data) {
  _location = data;
  // console.log(data);
}

function loadUser(data) {
  if (data.role) {
    cookie.save('dat_role', data.role);
    cookie.save('is_loggedin', true);
    _user = {};
    // console.log(data);
  }
  else _user = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
let ProductStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getProduct: function() {
    return _product;
  },
  getTag: function() {
    return _tag;
  },
  getLocation: function() {
    return _location;
  },

  getUser: function() {
    return _user;
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
  let action = payload.action;
  let text;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case ProductConstants.RECEIVE_DATA:
      loadProductData(action.data);
      break;

    case ProductConstants.RECEIVE_TAG:
      loadTag(action.data);
      break;

    case ProductConstants.RECEIVE_FP:
      loadFP(action.data);
    break;

    case ProductConstants.RECEIVE_LOCATION:
      loadLocation(action.data);
      break;

    case ProductConstants.RECEIVE_USER:
      loadUser(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ProductStore.emitChange();

  return true;

});

module.exports = ProductStore;