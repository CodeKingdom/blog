var app = function () {
	var mongoose = require('mongoose');
	var express = require('express');

	mongoose.connect('mongodb://localhost/posts');

	var app = express();
	app.use(express.bodyParser());

	var api = require('./api.js');

	app.get('/posts', api.get);

	app.post('/posts', api.post);

	return app;
}();

module.exports = app;

