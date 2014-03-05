var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('./post.js');

var User = mongoose.model('User', new mongoose.Schema({
    name: String,
    _id: Number,
    age: Number,
    posts : [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}));

module.exports = User;