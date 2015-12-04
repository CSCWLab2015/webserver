'use strict';


var express = require('express');
var router = express.Router();
router.use(express.static(__dirname + '/build'));


router.get('*', function(req, res){
	res.sendFile(__dirname + '/build/index.html');
});

module.exports = router;