var express = require('express');
var site = express.Router();
var utils = require('../lib/utils');

var firebase = require('firebase');

var firebaseUrl = "https://platon.firebaseio.com/slides";

site.use(function(req, res, next){
  next();
});

site.route('/:hashId')
  .get(function(req, res){
    var hashId = req.params.hashId;
    res.render('slidesEdit', {hash:hashId});
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
    ref.set({markdown:'#title 1'});
    res.redirect('/' + newHash);
  });

module.exports = site;
