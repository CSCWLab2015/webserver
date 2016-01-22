function checkBin(n){return/^[01]{1,64}$/.test(n)}
function checkDec(n){return/^[0-9]{1,64}$/.test(n)}
function checkHex(n){return/^[0-9A-Fa-f]{1,64}$/.test(n)}
function pad(s,z){s=""+s;return s.length<z?pad("0"+s,z):s}
function unpad(s){s=""+s;return s.replace(/^0+/,'')}

//Decimal operations
function Dec2Bin(n){if(!checkDec(n)||n<0)return 0;return n.toString(2)}
function Dec2Hex(n){if(!checkDec(n)||n<0)return 0;return n.toString(16).toUpperCase()}

//Binary Operations
function Bin2Dec(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(10)}
function Bin2Hex(n){if(!checkBin(n))return 0;return parseInt(n,2).toString(16).toUpperCase()}

//Hexadecimal Operations
function Hex2Bin(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(2)}
function Hex2Dec(n){if(!checkHex(n))return 0;return parseInt(n,16).toString(10)}

module.exports = {
	  
	nxt : {
		'device': {
			'plates': 'A0',
			'bricks': 'A1',
			'printer': 'A2',
			'conveyor': 'A3',
			'delivery': 'A4'
		},
		'type': {
			'request': 'A0',
			'reply': 'A1'
		},
		'method': {
			'print': 'B0',
			'status': 'B1'
		}
	},

	Encode2Hex: function(senderID, receiverID, type, method, binaryData){
		// senderID
		if (senderID.length != 2) {
			console.error('Expected length of senderID is 2');
			return false;
		}
		if(!checkHex(senderID)){
			console.error('senderID must be in hexadecimal!');
			return false;
		}
		
		// receiverID
		if (receiverID.length != 2) {
			console.error('Expected length of receiverID is 2');
			return false;
		}
		if(!checkHex(receiverID)){
			console.error('receiverID must be in hexadecimal!');
			return false;
		}
		
		// data
		var bin2hex =  parseInt(binaryData.charCodeAt(0), 10).toString(16);
		// if(!checkBin(binaryData)){
		// 	console.error('data must be in binary!');
		// 	return false;
		// }

		// var bin2hex = Bin2Hex(binaryData);
		// if (bin2hex.length < 7) {
		// 	bin2hex = '0' + bin2hex;
		// }
		
		message = senderID+receiverID+type+method+bin2hex;
		
		// length
		if(!checkDec(message.length)){
			console.error('length is not decimal!');
			return false;
		}
		if (message.length > 255) {
			console.error('Max length of message is 255, but got '+ message.length);
			return false;
		}
		messageLength = Dec2Hex(message.length)
		if (message.length < 16) {
			messageLength = '0'+messageLength;
		}
		
		console.log('Message:', messageLength, senderID, receiverID, type, method, bin2hex);
		return '0A0080090006'+messageLength+message;
		// return '0A0080090006'+bin2hex+'00000';
	},


};