var express = require('express');
var gistRouter = express.Router();
var gist = require('../lib/gist');

gistRouter.use(function(req, res, next){
  next();
});

gistRouter.route('/')
  .get(function(req, res){
    res.render('gist_index');
  });

gistRouter.route('/:id')
  .get(function(req, res){
    var gistId = req.params.id;
    gist.markdownFromGistId(gistId, function(err, markdown){
      res.render('gist_id', {markdown:markdown});
    });
  });

module.exports = gistRouter;
