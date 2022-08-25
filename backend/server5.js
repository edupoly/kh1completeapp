var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser')
var posts = require('./posts')
var studentRoutes = require('./student.routes')
var app = express();
app.use(express.static(__dirname+'/public'))
app.use(cookieParser());
app.use(session({secret: "prateekisthesecret"}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/students",studentRoutes)

app.listen(4000);