var express = require("express");
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", function (req, res) {
  res.render("index.html");
});

app.listen(port, function () {
  console.log("app running");
});
