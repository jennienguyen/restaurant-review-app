const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const mySQLConnection = require("./connection");
const appRouter = require("./routes/app");
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use("/", appRouter);
app.use("/app", appRouter);

//app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(3000);