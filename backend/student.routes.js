var express = require('express');
var router = express.Router();
var students = require('./students')
router.get("/",function(req,res){
    res.json(students)
})
router.get("/getAllStudents",function(req,res){
    res.json(students)
})
router.get("/getStudentsByGender/:gender",function(req,res){
    var filteredStudents = students.filter(function(s){
        if(s.gender===req.params.gender){return true}
    })
    res.json(filteredStudents)
})
router.get("/getStudentsByPlace/:loc",function(req,res){
    var filteredStudents = students.filter(function(s){
        if(s.place===req.params.loc){return true}
    })
    res.json(filteredStudents)
})
module.exports=router