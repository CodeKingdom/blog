// var post = require('./api/post.js');

// var user = require('./api/user.js');

// app.get('/posts/:id', post.getOne);

// app.get('/posts', post.get);

// app.post('/posts', post.post);

// app.delete('/posts/:id', post.remove);

// app.put('/posts/:id', post.update);

var superagent = require('superagent')
var expect = require('expect.js')

describe('Blog post API', function(){  
  it('retrieves an object', function(done){
    superagent.get('http://localhost:5000/users/1')
      .end(function(e, res){                
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body.name).to.eql('Dan Treasure');                               
        done()
      });
  })     
})