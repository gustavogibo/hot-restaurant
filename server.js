var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var port = 3000;

var app = express();

app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());

var tableList = [{
    name:"chicken",
    phone:"000-000-0000",
    email:"test@chickens.com",
    id:10
}];

var waitList = [{
    name:"farley",
    phone:"000-000-0000",
    email:"farley@chickens.com",
    id:11
}];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/list", function(req, res) {
    res.sendFile(path.join(__dirname, "views.html"));
});

// Displays all table reservations
app.get("/tableReservations", function(req, res) {
    return res.json(tableList);
});

// Displays all wait reservations
app.get("/waitReservations", function(req, res) {
    return res.json(waitList);
});

// Displays all wait reservations
app.get("/tablejson", function(req, res) {
    return res.json(tableList);
});

// Displays all wait reservations
app.get("/waitjson", function(req, res) {
    return res.json(waitList);
});

app.post("/action/reserve", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newReservation = req.body;
  
    console.log(newReservation);

    if(tableList.length < 5) {

        tableList.push(newReservation);
        alert("You are on the table list! We will call you soon, thanks!");

    } else {

        waitList.push(newReservation);
        alert("Sorry, we are busy today! We put you on a waiting list, we'll call you soon!");
    }

  });

app.listen(port, function() {
    console.log("App listening on PORT " + port);
  });