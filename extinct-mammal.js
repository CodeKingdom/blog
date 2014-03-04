var mongoose = require('mongoose');

var ExtinctMammal = mongoose.model('ExtinctMammal', new mongoose.Schema({
    name: String,
    type: String,
    year_extinct: Number
}));

module.exports = ExtinctMammal;