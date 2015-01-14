var nock = require('nock');
var should = require('should');
var gist = require('../lib/gist');

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

describe('gist module', function(){
  it('markdown from gist id', function(done){
    var gistId = 'abc';
    var markdown = gist.markdownFromGistId(gistId, function(err, markdown){
      markdown.should.be.equal('markdown content');
      done();
    });
  });
  describe('markdown from files', function(){
    it('only from markdown language', function(){
      var files = {
        'file1.js':{
          'language': 'JavaScript',
          'content': 'JavaScript code'
        },
        'file2.md':{
          'language': 'Markdown',
          'content': 'markdown code'
        }
      };
      var markdown = gist.markdownFromFiles(files);
      markdown.should.be.equal('markdown code');
    });
    it('if files is undefined');
    it('if files dont have markdown language');
    it('return the first with markdown language');
  });
});
