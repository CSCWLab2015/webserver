"use strict"
let ProductActions = require('../actions/productActions');
let http = require("http");
let $ = require("jquery");
let _ = require("lodash");
let sha1 = require('sha1');
let xhr = new XMLHttpRequest();

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

var currentXhr;
var currentXhrFP;
var currentSearchXhr;

var errorMessage = { error: "Unable to connect to API Server"}

var host="http://192.168.1.101:8080";

module.exports = {


	login: function(payload) {
    	if (payload){
	    	// var url = 'http://192.168.182.108:3000/auth/request-token';
	    	var url = host+"/login";
	    	payload.password = sha1(payload.password);
	    	// console.log(payload);
	    	var params = JSON.stringify(payload);

			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.status == 200) {
			    	if (xhr.responseText){
				    	var result = JSON.parse(xhr.responseText);
				    	ProductActions.receiveUser(result);
				    }
			    }
			    else {
			    	if (xhr.responseText){
				    	var error = JSON.parse(xhr.responseText);
				        ProductActions.receiveUser(error);
				    }
			    }
			}

			xhr.send(params);

	    }
	},

	postBrick: function(payload) {
    	if (payload){
	    	// var url = 'http://192.168.182.108:3000/auth/request-token';
	    	var url = host+"/brick";
	    	var params = JSON.stringify(payload);
	    	// console.log(params);
	    	// console.log(payload);

			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.status == 200) {
			    	if (xhr.responseText){
				    	var result = JSON.parse(xhr.responseText);
				    	console.log(result);
				        module.exports.getBrick(result);
				    }
			    }
			    else {
			    	if (xhr.responseText){
				    	var error = JSON.parse(xhr.responseText);
				        ProductActions.receiveUser(error);
				    }
			    }
			}

			xhr.send(params);

	    }
	},


	getLetter: function(payload) {
    	if (payload){
	    	// var url = 'http://192.168.182.108:3000/auth/request-token';
	    	var url = host+"/letter/"+payload;
	    	// console.log(payload);

			xhr.open("GET", url, true);
			// xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
			// xhr.setRequestHeader("Authorization", "Bearer "+payload);

			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.status == 200) {
			    	if (xhr.responseText){
				    	var result = JSON.parse(xhr.responseText);
				        ProductActions.receiveProduct(result);
				    }
			    }
			    else {
			    	if (xhr.responseText){
				    	var error = JSON.parse(xhr.responseText);
				        ProductActions.receiveProduct(error);
				    }
			    }
			}

			xhr.send();

	    }
	},

	getBrick: function(payload) {
    	// var url = 'http://192.168.182.108:3000/auth/request-token';
    	var url = host+"/brick";
    	// console.log(payload);

		xhr.open("GET", url, true);
		// xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
		// xhr.setRequestHeader("Authorization", "Bearer "+payload);

		xhr.onreadystatechange = function() {//Call a function when the state changes.
		    if(xhr.status == 200) {
		    	if (xhr.responseText){
			    	var result = JSON.parse(xhr.responseText);
			    	if (payload) {
			    		ProductActions.receiveProduct(_.extend(result, payload));
			    		return;
			    	}
			        ProductActions.receiveProduct(result);
			    }
		    }
		    else {
		    	if (xhr.responseText){
			    	var error = JSON.parse(xhr.responseText);
			        ProductActions.receiveProduct(error);
			    }
		    }
		}

		xhr.send();

    
	}

};