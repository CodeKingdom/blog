var ExtinctMammal = require('./extinct-mammal.js');

var listMammals = function(req, res) {
  var filter = {};
  if (req.params.type) {
    filter = {type: req.params.type};
  }
  ExtinctMammal.find(filter)
  .sort('name')
  .select('name year_extinct type')
  .exec(function(err, mammals) {
    res.send(mammals);
  });  
};

var saveMammal = function(req, res) {
  var newMammal = new ExtinctMammal({
    name: req.body.name,
    type: req.body.type,
    year_extinct: req.body.year_extinct
  });
  newMammal.save(function(err) {
    res.send({success: true});
  });
};

module.exports = {
  get: listMammals,
  post: saveMammal
};