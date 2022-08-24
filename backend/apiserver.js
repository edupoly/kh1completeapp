var express = require('express')
var app = express();
var cors = require('cors')
var foodItems = require('./food')
app.use(cors());

app.get('/foodItems',function(req,res){
    res.send(foodItems)
})

app.listen(5500);