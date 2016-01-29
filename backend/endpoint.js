var express     = require("express"),
    mysql       = require("mysql"),
    _           = require("lodash"),
    bodyParser  = require("body-parser"),
    http        = require("http"),
    letters     = require("./json/letters.json");

var options = {
  host: 'localhost',
  port: '9090',
  path: '/job',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'lego',
    multipleStatements: true
  });

var STATUS = {
    800:  {
            info: "Status",
            message: "Status"
          },
    801: {
          info: "Waiting",
          message: "Job Submitted"
          },
    802: {
          info: "Waiting",
          message: "Job Started"
          },
    803: {
          info: "Waiting",
          message: "Job Done"
          },
    810: {
          info: "Printing",
          message: "Printing"
          },
    820: {
          info: "Waiting",
          message: "Moving to printer"
          },
    821: {
          info: "Waiting",
          message: "Moving to delivery warehouse"
          },
    830: {
          info: "Waiting",
          message: "Loading"
          },
    831: {
          info: "Waiting",
          message: "Unloading"
          },
    901: {
          info: "Error",
          message: "Bluetooth communication error"
          },
    902: {
          info: "Error",
          message: "Job could not be started"
          },
    910: {
          info: "Error",
          message: "Brick is not available in the ware house to be used in printing"
          },
    911: {
          info: "Error",
          message: "Brick is not picked up by the printer head from the bricks warehouse"
          },
    912: {
          info: "Error",
          message: "Brick is not plugged to the plate (still in the head)."
          },
    913: {
          info: "Error",
          message: "Brick is not plugged to the correct position on the plate"
          }
};

var ROUTER = {
  host: "http://localhost:9090",
  job: "/job",
  status: "/status"
}

var RESPONSE, LETTER ="";
var app = express();


var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

var request = http.request(options, function(response) {
    console.log("INFO: Job sent successfully");
});
request.on('error', function(err) {
    console.log("FATAL: Unable to connect to ROUTER\n" + err);
});


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
  var letter = req.params.id.toUpperCase();

  // console.log(letter);

  connection.query("SELECT * from letter WHERE letter = '" + letter + "'; SELECT * from resources", function(err, rows, fields) {

    // console.log(rows);

  var brick = rows[1][0].amount,
      plate = rows[1][1].amount,
      cost = rows[0][0].cost,
      returnVal = rows[0][0],
      delta = brick - cost,
      payload;

  if (!err){

      if (brick > cost && plate > 0) {
        
        plate = plate - 1;

        connection.query("UPDATE resources set amount = "+ delta +" where id = 1; UPDATE resources set amount = " + plate +" where id = 2" , function(err, rows, fields) {
        if (!err) {

          returnVal.representation = parseInt(returnVal.representation, 2).toString(2);
          res.send(returnVal);


          var payload = {
            "type": "print",
            "letter": returnVal.letter
          };

          LETTER = returnVal.letter;

          request.write(JSON.stringify(payload), function(err) {request.end();});

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
    var method = req.body.method.toString();
    var payload = req.body.payload;
    var timestamp = Math.round(req.body.time/1000000);

    RESPONSE = {
      "code" : method,
      "method": STATUS[method].message,
      "payload": payload,
      "timestamp": timestamp
    };

    timestamp = new Date(timestamp).toTimeString();

    if (method.substring(0, 1) == "9") console.log("ERROR: " + timestamp + " " + STATUS[method] + " " + payload);
    else console.log("INFO: " + timestamp + " " + STATUS[method] + " " + payload);

    res.send(STATUS[method]);
});

app.get("/status",function(req,res){
  res.send(RESPONSE);
});

app.get("/letters",function(req,res){
  res.send(letters);
});

app.get("/plates",function(req,res){
  var plateInfo = {"letter": LETTER};
  res.send(plateInfo);
});

app.get("/arstatus",function(req,res){

  var code = 0,
      arstatus = {
        "status": "waiting",
        "letter": "",
        "index": -1,
        "error": code
      };


  if (RESPONSE) {
      if (RESPONSE.code.substring(0, 1) == "8")  code = 0;
      arstatus = {
        "status": STATUS[RESPONSE.code].info,
        "letter": LETTER,
        "index": RESPONSE.payload,
        "error": parseInt(code, 10)
      }
  }

  res.send(arstatus);
});


app.listen(8080);