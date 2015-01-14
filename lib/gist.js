var request = require('request');

exports = module.exports = {};

var options = {
  headers: {
    'User-Agent': 'request'
  }
};

var markdownFromFiles = function(files){
  for ( var file in files ){
    var language = files[file].language;
    var content = files[file].content;
    if ( language === 'Markdown' ){
      return content;
    }
  }
};
exports.markdownFromFiles = markdownFromFiles;

exports.markdownFromGistId = function(gistId, cb){
  var githubGistsUrl = 'https://api.github.com/gists/';
  options.url = githubGistsUrl + gistId;
  request(options, function(error, response, body){
    if ( !error && response.statusCode === 200 ) {
      var bodyJSON = JSON.parse(body);
      var files = bodyJSON.files;
      if ( files ) {
        var markdown = markdownFromFiles(files);
        cb(error, markdown );
      }
    }
  });
};
