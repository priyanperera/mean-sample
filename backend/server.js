var express = require('express');
var cors = require('cors');
var parser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

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

app.get('/users', async (request, response) => {
    try{
        var users = await User.find({}, '-password -__v');
        response.send(users);
    }catch(error){
        console.error(error);
        response.status(500);
    }    
});

app.post('/register', (request, response) => {
    var data = request.body;    
    var user = new User(data);
    user.save((error, result) => {
        if(error){
            console.log(error);
        }
        response.status(200);
    });    
});

app.post('/login', async (request, response) => {
    var data = request.body;
    var user = await User.findOne({ email: data.email });
    if(!user){
        return response.status(401).send({ message: 'Email or password is invalid.'})
    }

    if(data.password != user.password){
        return response.status(401).send({ message: 'Email or password is invalid.'})
    }

    var payload = {};

    var token = jwt.encode(payload, '123');

    response.status(200).send({token});
});

mongoose.connect('mongodb://test:test@ds137686.mlab.com:37686/bspriyan_pssocial', { useMongoClient: true }, (error) =>{
    if(!error){
        console.log('connected to mongo');
    }
});
app.listen(30000);