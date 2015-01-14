var express = require('express');

var site = require('./routes/site');
var gist = require('./routes/gist');

var port = process.env.PORT || 8080;

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var publicDir = __dirname + '/public';
app.use(express.static(publicDir));

app.use('/gist', gist);
app.use('/', site);

app.listen(port);
module.exports.app = app;
