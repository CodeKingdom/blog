var app = function () {
	var mongoose = require('mongoose');
	var express = require('express');

	mongoose.connect('mongodb://dantreasure:yoyoman@ds033569.mongolab.com:33569/blog');

	var app = express();
	app.use(express.bodyParser());

	var post = require('./api/post.js');

	var user = require('./api/user.js');

    //this pattern enables cross domain requests
    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

    app.get('/', function(req, res, next) {
        app.get('/posts', post.get);

        app.get('/posts/:id', post.getOne);

        app.get('/users/:id', user.getOne);

        app.get('/users', user.get);

        app.get('/users/:id/posts', user.getPosts);
    });

    app.post('/', function(req, res, next) {
        app.post('/posts', post.post);

        app.post('/users', user.post);
    });

    app.delete('/', function(req, res, next) {
        app.delete('/posts/:id', post.remove);

        app.delete('/users/:id', user.remove);
    });

    app.delete('/', function(req, res, next) {
        app.put('/posts/:id', post.update);

        app.put('/users/:id', user.update);
    });

	return app;
}();

module.exports = app;