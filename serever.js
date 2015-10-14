var http = require("http");
var express = require("express");
var  app = express();
var controllers = require("./controllers");

// View Engine
app.set("view engine", "vash");

// Map route
controllers.init(app);


app.get("/api/users", function(req, res){
    res.send({ app: "TheBoard", author: "German"});
})


var server = http.createServer(app);
server.listen(3000);