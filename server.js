var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/unicornsDB', function () {
    console.log("DB connection established!!!");
})

const Unicorn = require('./public/unicornModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));


app.post('/unicorns', function(req,res){
    let newUni = new Unicorn(req.body);
    newUni.save();
    res.send(newUni);
})

app.get('/unicorns', function(req,res){
    Unicorn.find({}).exec(function(err, data){
        if(err) {res.status(500).send(err)}
        res.send(data);
    })
})

app.delete('/unicorns/:id', function(req, res){
    let id = req.params.id;
    Unicorn.findByIdAndRemove(id).exec(function(err, data){
        if(err) {res.status(500).send(err)}
        else{
            res.send(data);
            console.log('deleted')
        }
    })
})


app.listen(1000, () => {
    console.log("Server started on port 1000!");
});