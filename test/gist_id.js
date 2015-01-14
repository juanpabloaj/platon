var should = require('should');
var request = require('supertest');
var jade = require('jade');
var nock = require('nock');
var app = require('../server').app;

describe('GET /gist/id', function(){
  beforeEach(function(){
    var scope = nock('https://api.github.com')
      .get('/gists/abc')
      .reply(200, {
        'files': {
          'slide.md': {
            'filename': 'slide.md',
            'type': 'text/plain',
            'language': 'Markdown',
            'raw_url': 'gist_raw_url',
            'content': 'markdown content'
          }
        }
    });
  });

  it('return gist_id view', function(done){
    request(app)
      .get('/gist/abc')
      .end(function(err, res){
        var markdown = 'markdown content';
        var html = jade.renderFile('./views/gist_id.jade', {markdown:markdown});
        res.text.should.equal(html);
        done();
      });
  });
  it('markdown in response', function(done){
    request(app)
      .get('/gist/abc')
      .end(function(err, res){
        res.text.should.containEql('markdown content');
        done();
      });
  });
  it('gist id dont exist redirect to /gist');
});
