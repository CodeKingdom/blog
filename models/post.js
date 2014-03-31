var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');

var Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    _owner : { type: Number, ref: 'User' },
    body: String,
	author: String,
	highlight: String,
    created_at: { type: Date, default: Date.now }
}));

module.exports = Post;