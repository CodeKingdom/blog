var Post = require('../models/post.js');
var User = require('../models/user.js');

var listUsers = function(req, res) {  
	User.find()
		.sort('name')
		.exec(function(err, users) {
			res.send(users);
		}); 
};

var getUser = function(req, res) {
	var query = User.findById(req.params.id);

	query.exec(function(err, user){
		if(err){
			res.send(err);
		}
		res.send(user);
	});	
};

var saveUser = function(req, res) {
	var newUser = new User({
		name: req.body.name,
		_id: req.body._id,
		age: req.body.age
	});
	newUser.save(function(err) {
		res.send({success: true});
	});
};

var deleteUser = function(req, res){
	var query = User.findById(req.params.id);

	query.remove(function(err){
		if(!err){
			res.send({success:true})
		}
	})
};

var updateUser = function(req, res){
	User.findById(req.body.id, function(err, user){
		
		user.name = req.body.name || user.name;
		user.age = req.body.age || user.age;
		
		user.save(function (err) {
		    if (err) return (err);
		    res.send(user);
	  	});
	})
}

var getPosts = function(req, res){
	User.findById(req.params.id, function(err, user){		
		Post.find()
			.where("_owner").equals(req.params.id)
			.exec(function(err, posts){
				if(err){
					return err;
				} else{
					res.send(posts);
				}

			})
	});
};

module.exports = {
	get: listUsers,
	getOne: getUser,
	getPosts: getPosts,
	post: saveUser,
	remove: deleteUser,
	update: updateUser
};