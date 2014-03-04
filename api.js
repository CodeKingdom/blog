var Post = require('./post.js');

var listPosts = function(req, res) {
  Post.find()
  .sort('title')
  .exec(function(err, posts) {
    res.send(posts);
  });  
};

var savePost = function(req, res) {
  var newPost = new Post({
    title: req.body.title,
    body: req.body.body
  });
  console.log(req.body);
  newPost.save(function(err) {
    res.send({success: true});
  });
};

module.exports = {
  get: listPosts,
  post: savePost
};