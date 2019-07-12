var express = require('express');
var cors = require('cors');

var app = express();
var mongoose = require('mongoose');

var SERVER_PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));

const mongoURI = 'mongodb://localhost/mernauth';

mongoose.connect(mongoURI, {useNewUrlParser: true}).then(
    () => console.log('Conectado ao MongoDB')
).catch(
    err => console.log(err)
);

var Users = require('./routes/Users');

app.use('/users', Users);

app.listen(SERVER_PORT, () => console.log('Servidor iniciado na porta ' + SERVER_PORT));