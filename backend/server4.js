var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser')
var posts = require('./posts')
var app = express();
app.use(express.static(__dirname+'/public'))
app.use(cookieParser());
app.use(session({secret: "prateekisthesecret"}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var users = [
    {
        username:'praveen',
        password:'123',
        userId:12
    },
    {
        username:'prateek',
        password:'222',
        userId:47
    },
    {
        username:'alok',
        password:'333',
        userId:17
    },
]

app.post("/login",function(req,res){
    var s = users.find(function(a){
        if(a.username===req.body.username && a.password===req.body.password){
            return true
        }
    })
    if(s){
        //res.cookie('username',req.body.username);
        req.session.username = req.body.username;
        //res.cookie('password',req.body.password);
        req.session.password = req.body.password;
        req.session.userId = s.userId;
        console.log(req.session)
        res.redirect("/")
    }
    else{
        res.sendFile("/login.html")
    }
})

app.use(function(req,res,next){
    if(req.session.username){
        next()
    }
    else{
        res.redirect("/login.html")
    }
})

app.get("/",function(req,res){
    var filteredPosts = posts.posts.filter(function(p){
        if(p.userId===req.session.userId){
            return true
        }
    })
    console.log(filteredPosts)
    res.render('posts.pug',{posts:filteredPosts})
})
app.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/')
})

app.listen(4000);