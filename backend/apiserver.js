var express = require('express')
var app = express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cors = require('cors')
var foodItems = require('./food')
app.use(cors());
const jwt = require('jsonwebtoken');
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
        const token = jwt.sign(req.body, "some secret");
        console.log(token)
        res.json({token:token});
    }
    else{
        console.log("erro")
        res.json({err:'passwordnotmatched'})
    }
})

app.get('/foodItems',function(req,res){
    try{
        var x = jwt.verify(req.headers.authorization.split(' ')[1],"some secret")
        res.send(foodItems)
    }
    catch(err){
        res.send({err:'token mismatched'})
    }
    
})

app.listen(5500);