var Post = require('./post.js');

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
	var newPost = new Post({
		title: req.body.title,
		body: req.body.body
	});
	newPost.save(function(err) {
		res.send({success: true});
	});
};

var deletePost = function(req, res){
	var query = Post.findOne({_id: req.params.id});

	query.remove(function(err){
		if(!err){
			res.send({success:true})
		}
	})
};

var updatePost = function(req, res){
	Post.findById(req.params.id, function(err, post){
		
		post.title = req.body.title || post.title;
		post.body = req.body.body || post.body;
		
		post.save(function (err) {
	    if (err) return (err);
	    res.send(post);
  	});
	})
}

module.exports = {
	get: listPosts,
	getOne: getPost,
	post: savePost,
	remove: deletePost,
	update: updatePost
};