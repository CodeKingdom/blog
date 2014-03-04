var mongoose = require('mongoose');

var Post = mongoose.model('Post', new mongoose.Schema({
    title: String,
    body: String,
    created_at: { type: Date, default: Date.now }
}));

module.exports = Post;