var express = require('express');
var site = express.Router();
var utils = require('../lib/utils');

var firebase = require('firebase');

var firebaseUrl = 'https://platon.firebaseio.com/slides';

function checkIfSlideIdExist(slideId, cb){
  var slidesRef = new firebase(firebaseUrl);
  slidesRef.child(slideId).once('value', function(snapshot){
    var exists = (snapshot.val() !== null );
    cb(slideId, exists);
  });
}

site.use(function(req, res, next){
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    res.end(/* icon content here */);
  } else if ( req.url === '/robots.txt' ) {
    res.type('text/plain');
    res.send('User-agent: *\nDisallow: /');
  } else {
    next();
  }
});

site.route('/:hashId')
  .get(function(req, res){
    var hashId = req.params.hashId;
    checkIfSlideIdExist(hashId, function(slideId, exists){
      if (exists){
        res.render('slidesEdit', {hash:hashId});
      } else {
        res.redirect('/');
      }
    });
  });

site.route('/:hashId/show')
  .get(function(req, res){
    var hashId = req.params.hashId;
    res.render('slidesShow', {hash:hashId});
  });

site.route('/')
  .get(function(req, res){
    newHash = utils.genRandomId();
    var ref = new firebase(firebaseUrl + '/' + newHash);
    ref.set({
      markdown:utils.defaultMarkdownMessage,
      createdAt:firebase.ServerValue.TIMESTAMP,
      theme: 'default-theme'
    });
    res.redirect('/' + newHash);
  });

site.route('*')
  .get(function(req, res){
    res.redirect('/');
  });

module.exports = site;
