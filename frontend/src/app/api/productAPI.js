"use strict"
var ProductActions = require('../actions/productActions');
var http = require("http");
var $ = require("jquery");
var _ = require("lodash");
var sha1 = require('sha1');
var xhr = new XMLHttpRequest();

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

var errorMessage = { error: "Unable to connect to Backend"}

var host="http://10.223.90.151:8080";

module.exports = {


	login: function(payload) {
    	if (payload){
	    	var url = host+"/login";
	    	payload.password = sha1(payload.password);
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
				    else {
				    	ProductActions.receiveUser(errorMessage);
				    }
			    }
			}

			xhr.send(params);

	    }
	},

	postRes: function(payload) {
    	if (payload){
	    	var url = host+"/resources";
	    	var params = JSON.stringify(payload);

			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.status == 200) {
			    	if (xhr.responseText){
				    	var result = JSON.parse(xhr.responseText);
				        module.exports.getRes(result);
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
    		ProductActions.receiveStatus("");

	    	var url = host+"/letter/"+payload;

			xhr.open("GET", url, true);
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

	getRes: function(payload) {
    	var url = host+"/resources";

		xhr.open("GET", url, true);

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

    
	},

	getStatus: function(payload) {
		var interval = setInterval(function(){

	    	var url = host+"/status";

			xhr.open("GET", url, true);

			xhr.onreadystatechange = function() {//Call a function when the state changes.
			    if(xhr.status == 200) {
			    	if (xhr.responseText){
				    	var result = JSON.parse(xhr.responseText);
				    	ProductActions.receiveStatus(result);
				    	if (result.code == 803) {
				    		ProductActions.receiveProduct({done: true});
				    		clearInterval(interval);
				    	}
				    }
			    }
			    else {
			    	if (xhr.responseText){
				    	var error = JSON.parse(xhr.responseText);
				    }
			    }
			}

			xhr.send();


		}, 1000);

	}

};