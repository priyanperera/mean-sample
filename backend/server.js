var express = require('express');
var cors = require('cors');
var parser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

var User = require('./models/User');

var posts = [
    { message: 'hello' },
    { message: 'hi' }
];

app.use(cors());
app.use(parser.json());

app.get('/posts', (request, response) => {
    response.send(posts);
});

app.post('/register', (request, response) => {
    var data = request.body;    
    var user = new User(data);
    user.save((error, result) => {
        if(error){
            console.log(error);
        }
        response.sendStatus(200);
    });    
});

mongoose.connect('mongodb://test:test@ds137686.mlab.com:37686/bspriyan_pssocial', { useMongoClient: true }, (error) =>{
    if(!error){
        console.log('connected to mongo');
    }
});
app.listen(30000);