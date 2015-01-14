var should = require('should');
var request = require('supertest');
var jade = require('jade');
var app = require('../server').app;

describe('GET /gist', function(){
  it('return gist index view', function(done){
    request(app)
      .get('/gist')
      .end(function(err, res){
        var html = jade.renderFile('./views/gist_index.jade');
        res.text.should.equal(html);
        done();
      });
  });
  it('GET /gist/undefind/url redirect to /gist/');
});
