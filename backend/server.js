var express = require('express')

var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

var cors = require('cors')
var foodItems = require('./food')
app.use(cors())
app.use(function(req,res,next){
   console.log("simple middleware called")
   setTimeout(()=>{
    next();
   },1000)
})
app.use(function(req,res,next){
    console.log("second middleware called")
    next()
})
app.get('/foodItems',function(req,res){
    res.send(foodItems)
})

app.listen(5500);