var mongoose = require('mongoose');
var express = require('express');

mongoose.connect('mongodb://localhost/extinct-mammals');

var app = express();
app.use(express.bodyParser());

var api = require('./api.js');

app.get('/mammals/:type?', api.get);

app.post('/mammals', api.post);

app.listen(8889);

module.exports = app;