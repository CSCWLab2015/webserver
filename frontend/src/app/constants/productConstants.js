var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
  PRODUCT_ADD: null,       // Adds item to cart
  PRODUCT_REMOVE: null,    // Remove item from cart
  PRODUCT_VISIBLE: null,   // Shows or hides the cart
  SET_SELECTED: null,   // Selects a product option
  RECEIVE_DATA: null,    // Loads our mock data
  RECEIVE_USER: null,
  RECEIVE_STATUS: null
});