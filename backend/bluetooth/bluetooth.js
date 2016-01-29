var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();
var address = '00:16:53:15:38:61';
var test = new Buffer('0a0080090006050103070909', 'hex');

btSerial.findSerialPortChannel(address, function(channel) {
    btSerial.connect(address, channel, function() {
        console.log(address+ ' connected');

        btSerial.write(test, function(err, bytesWritten) {
            if (err) console.log(err);
        });

        btSerial.on('failure', function(err) {
            console.log(err);
        });
        
        btSerial.on('data', function(buffer) {
            console.log(buffer);
            
        });
        
    }, function (err) {
        console.log(err);
    });

}, function() {
    console.log('found nothing');
});



// btSerial.on('found', function(address, name) {
//     // console.log(address);
//     console.log(name);
//     btSerial.findSerialPortChannel(address, function(channel) {
//         console.log(address);
//         console.log(channel);
//         console.log(btSerial.isOpen());
//         var someChannel = 3;
//         btSerial.connect(address, channel, function() {
//             console.log(address+ ' connected');

//             btSerial.write(new Buffer('0FB1A2A0B01FFFFFF0', 'hex'), function(err, bytesWritten) {
//                 if (err) console.log(err);
//             });

//             btSerial.on('data', function(buffer) {
//                 console.log(buffer.toString('utf-8'));
//             });
//         }, function (err) {
//             console.log(err);
//         });

//         // close the connection when you're ready
//         btSerial.close();
//     }, function() {
//         console.log('found nothing');
//     });
// });

// btSerial.inquire();