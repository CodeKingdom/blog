var app = function () {
	var mongoose = require('mongoose');
	var express = require('express');

	mongoose.connect('mongodb://dantreasure:yoyoman@ds033569.mongolab.com:33569/blog');

	var app = express();
	app.use(express.bodyParser());


	var post = require('./api/post.js');

	var user = require('./api/user.js');

    //this pattern enables cross domain requests
//    app.all('*', function(req, res, next) {
//		res.header("Access-Control-Allow-Origin", "*");
//		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//		res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//        next();
//    });

	// Enables CORS
	var enableCORS = function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

		// intercept OPTIONS method
		if ('OPTIONS' == req.method) {
			res.send(200);
		}
		else {
			next();
		}
	};


// enable CORS!
	app.use(enableCORS);
//--------------

	app.get('/posts', post.get);

	app.get('/posts/:id', post.getOne);

	app.get('/users/:id', user.getOne);

	app.get('/users', user.get);

	app.get('/users/:id/posts', user.getPosts);


	app.post('/posts', post.post);

	app.post('/users', user.post);


	app.delete('/posts/:id', post.remove);

	app.delete('/users/:id', user.remove);


	app.put('/posts/:id', post.update);

	app.put('/users/:id', user.update);

	return app;
}();

module.exports = app;