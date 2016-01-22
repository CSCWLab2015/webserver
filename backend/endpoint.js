var express    = require("express"),
    mysql      = require('mysql'),
    _          = require("lodash"),
    bodyParser = require('body-parser'),
    request = require('request');
    // encoder    = require('./bluetooth/encoder.js'),
    // btSerial   = new (require('bluetooth-serial-port')).BluetoothSerialPort();


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'lego',
    multipleStatements: true
  });

var STATUS = {
    800: "Status",
    801: "Job Submitted",
    802: "Job Started",
    803: "Job Done",
    810: "Printing*",
    820: "Moving to printer",
    821: "Moving to delivery warehouse",
    830: "Loading",
    831: "Unloading",
    901: "Bluetooth communication error",
    902: "Job could not be started",
    910: "Brick is not available in the ware house to be used in printing",
    911: "Brick is not picked up by the printer head from the bricks warehouse",
    912: "Brick is not plugged to the plate (still in the head).",
    913: "Brick is not plugged to the correct position on the plate"
};

// var ERROR = {
//   error: "Error connecting to nxt device",
//   message: ""
// }

// var address = '00:16:53:15:38:61';
// var test = new Buffer('0a0080090006050103070909', 'hex');

var app = express();

////////////////////////////
//
// Connecting to NXT Devices
//
////////////////////////////

// btSerial.findSerialPortChannel(address, function(channel) {

//     btSerial.connect(address, channel, function() {
//         console.log("INFO: "+ address+ ' connected');
        
//     }, function (err) {
//         console.log(err);
//     });


// }, function() {
//     console.log('found nothing');
// });

// btSerial.on('data', function(buffer) {
//   // console.log(buffer);
//   ERROR.message = buffer;
// });

////////////////////////////
//
// Connecting to Database Server
//
////////////////////////////

connection.connect(function(err){
if(!err) {
    console.log("INFO: Database is connected ...");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});



////////////////////////////
//
// Adding header of the API
//
////////////////////////////

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



////////////////////////////
//
// Express modules
//
////////////////////////////


app.get("/letter/:id",function(req,res){
connection.query("SELECT * from letter WHERE letter = '" + req.params.id + "'; SELECT * from resources", function(err, rows, fields) {

  var brick = rows[1][0].amount,
      plate = rows[1][1].amount,
      cost = rows[0][0].cost,
      returnVal = rows[0][0],
      delta = brick - cost;

  if (!err){

      if (brick > cost && plate > 0) {
        
        plate = plate - 1;

        connection.query("UPDATE resources set amount = "+ delta +" where id = 1; UPDATE resources set amount = " + plate +" where id = 2" , function(err, rows, fields) {
        if (!err) {

          returnVal.representation = parseInt(returnVal.representation, 2).toString(2);
          returnVal.letter = returnVal.letter.toUpperCase();

          request.post(
              'http://localhost:9090/job',
              { form: { 
                  "type": "print",
                  "letter": returnVal.letter
                } 
              },
              function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      res.send(returnVal);
                  }
              }
          );

          
        }
        else res.send(err);});
        return;
      }
      if (brick < cost) res.send({ error: "Brick is not enough"});
      if (plate <= 0) res.send({ error: "Plate is not enough"});

    }
  else
    throw err;
  });
});

app.get("/resources",function(req,res){

  connection.query("SELECT * from resources", function(err, rows, fields) {
  
    if (!err)
      res.send(rows);
    else
      throw err;
    });

});

app.post("/resources",function(req,res){
    var type = req.body.type;
    var amount = req.body.amount;
    var currentAmount = 0;
    connection.query("SELECT amount from resources WHERE name = '"+ type +"'", function(err, rows, fields) {
    // connection.end();
  if (!err){
    currentAmount = JSON.parse(rows[0].amount)+JSON.parse(amount);
    connection.query("UPDATE resources SET amount = "+ currentAmount +" WHERE name ='" + type +"'", function(err, rows, fields) {
      if (!err) {
        var successMessage = "Adding " + amount + " " + type + "(s) success";
        res.send({message: successMessage});
        console.log(successMessage);
      }
      else res.send(err);});
  }
  else
    throw err;
  });
    // console.log(currentAmount);
});

app.post("/login",function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("SELECT * from user WHERE username = '"+ username +"'" + " AND password = '" + password + "'", function(err, rows, fields) {
    // connection.end();
  if (!err){
    var send = { error: "User not found"};
    if (rows[0]) send = rows[0];
    res.send(send);
  }
  else
    throw err;
  });
    // console.log(currentAmount);
});

app.post("/status",function(req,res){
    var method = req.body.method;
    var payload = req.body.payload;
    var timestamp = req.body.timestamp;

    console.log("INFO: ", timestamp, STATUS[method], payload);

    res.send(STATUS[method]);
});

app.listen(8080);