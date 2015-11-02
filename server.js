var http = require("http");
var express = require("express");
var  app = express();
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var controllers = require("./controllers");

// View Engine
app.set("view engine", "vash");

//
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret : "#theBoard"}));
app.use(flash());

// Map route
controllers.init(app);



// Set public static folder
app.use(express.static(__dirname + "/public"));


app.get("/api/users", function(req, res){
    res.send({ app: "TheBoard", author: "German"});
})


var server = http.createServer(app);
server.listen(3000);