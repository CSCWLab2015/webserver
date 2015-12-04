var express    = require("express");
var mysql      = require('mysql');
var _ = require("lodash");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'lego',
  multipleStatements: true
});
var app = express();
var bodyParser = require('body-parser')


connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  return next();
});
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


app.get("/letter/:id",function(req,res){
connection.query("SELECT * from letter WHERE letter = '" + req.params.id + "'; SELECT * from resources", function(err, rows, fields) {
// connection.end();
  if (!err){
      var brick = rows[1][0].amount;
      var plate = rows[1][1].amount;
      var cost = rows[0][0].cost;
      var returnVal = rows[0][0];
      if (brick > cost && plate > 0) {
        var delta = brick - cost;
        plate = plate - 1;
        // res.send(rows);
        connection.query("UPDATE resources set amount = "+ delta +" where id = 1; UPDATE resources set amount = " + plate +" where id = 2" , function(err, rows, fields) {
        if (!err) {
          res.send(returnVal);
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
// connection.end();
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

app.listen(8080);