var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//date
var reservations = [];
var waitingList = [];

//routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/printres", function(req, res){ 
  res.json(reservations);  
});

app.get("/api/printwait", function(req, res){ 
  res.json(waitingList);
});

//create reservations
app.post("/api/new", function(req, res){

  var newReservation = req.body;
  console.log(newReservation);

  if(reservations.length < 5){
    reservations.push(newReservation);
  } else {
    waitingList.push(newReservation);
  };

});

app.post("/api/delete", function(req, res){
  reservations = [];
  waitingList = [];
});

//start web server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
