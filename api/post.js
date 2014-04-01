var Post = require('../models/post.js');
var User = require('../models/user.js');

var listPosts = function(req, res) {  
	Post.find()
			.sort('title')
			.exec(function(err, posts) {
				res.send(posts);
			}); 
};

var getPost = function(req, res) {
	var query = Post.findById(req.params.id);

	query.exec(function(err, post){
		if(err){
			res.send(err);
		}
		res.send(post);
	});	
};

var savePost = function(req, res) {
	console.log(req.body);
	var newPost = new Post({
		title: req.body.title,
		body: req.body.body,
		_owner: req.body._owner,
		author: req.body.author,
		highlight: req.body.highlight
	});
	newPost.save(function(err) {
		if(err){

		} else {
			//Push the new post to the user
			User.findByIdAndUpdate(req.body._owner, { $push: { posts: newPost._id }}, function (err, user) {
				if(err) {
					return handleError(err);
				} else{
					res.send(user);	
				}
			});
			res.send({success:true});
		}		
	});	
};

var deletePost = function(req, res){
	var query = Post.findById(req.params.id);

	query.remove(function(err){
		if(!err){
			res.send({success:true});
		}
	});
};

var updatePost = function(req, res){
	Post.findById(req.params.id, function(err, post){
		
		post.title = req.body.title || post.title;
		post.body = req.body.body || post.body;
		
		post.save(function (err) {
			if (err) return (err);
			res.send(post);
		});
	});
};

module.exports = {
	get: listPosts,
	getOne: getPost,
	post: savePost,
	remove: deletePost,
	update: updatePost
};