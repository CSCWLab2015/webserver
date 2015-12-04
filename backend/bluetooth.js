var btSerial = new (require('bluetooth-serial-port')).BluetoothSerialPort();

btSerial.on('found', function(address, name) {
    // console.log(address);
    console.log(name);
    btSerial.findSerialPortChannel(address, function(channel) {
        console.log(address);
        console.log(channel);
        console.log(btSerial.isOpen());
        var someChannel = 3;
        btSerial.connect(address, channel, function() {
            console.log('connected');

            btSerial.write(new Buffer('my data', 'utf-8'), function(err, bytesWritten) {
                if (err) console.log(err);
            });

            btSerial.on('data', function(buffer) {
                console.log(buffer.toString('utf-8'));
            });
        }, function (err) {
            console.log(err);
        });

        // close the connection when you're ready
        btSerial.close();
    }, function() {
        console.log('found nothing');
    });
});

btSerial.inquire();