var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser')
var app = express();
app.use(express.static(__dirname+'/public'))
app.use(cookieParser());
app.use(session({secret: "prateekisthesecret"}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
var users = [
    {
        username:'praveen',
        password:'123'
    },
    {
        username:'prateek',
        password:'222'
    },
    {
        username:'alok',
        password:'333'
    },
]

app.post("/login",function(req,res){
    var s = users.find(function(a){
        if(a.username===req.body.username && a.password===req.body.password){
            return true
        }
    })
    if(s){
        res.cookie('username',req.body.username);
        res.cookie('password',req.body.password);
        res.redirect("/")
    }
    else{
        res.redirect("/login")
    }
})

app.use(function(req,res,next){
    if(req.cookies.username){
        next()
    }
    else{
        res.redirect("/login.html")
    }
})

app.get("/",function(req,res){
    res.send("this is home page")
})


app.listen(4000);