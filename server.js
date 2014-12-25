var express = require('express');

var site = require('./routes/site');

var port = process.env.PORT || 8080;

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

var publicDir = __dirname + '/public';
app.use(express.static(publicDir));

app.use('/', site);


app.listen(port);
