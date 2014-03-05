var app = function () {
	var mongoose = require('mongoose');
	var express = require('express');

	mongoose.connect('mongodb://dantreasure:yoyoman@ds033569.mongolab.com:33569/blog');

	var app = express();
	app.use(express.json());

	var post = require('./api/post.js');

	var user = require('./api/user.js');

	app.get('/posts/:id', post.getOne);

	app.get('/posts', post.get);

	app.post('/posts', post.post);

	app.delete('/posts/:id', post.remove);

	app.put('/posts/:id', post.update);

	app.get('/users/:id', user.getOne);

	app.get('/users', user.get);

	app.post('/users', user.post);

	app.delete('/users/:id', user.remove);

	app.put('/users/:id', user.update);

	app.get('/users/:id/posts', user.getPosts);

	return app;
}();

module.exports = app;