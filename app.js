/*
 * * Module dependencies
 * */
var express = require('express');
require('dotenv').config();
var lobstersRoute = require('./routes/lobsters.js');
var redditRoute = require('./routes/reddit.js');
var hackerRoute = require('./routes/hackernews.js');

var app = express(); // sets up the server

var PORT = process.env.PORT || 3000;

app.get('/ycomb', hackerRoute.htop);


app.get('/lobster', lobstersRoute.ltop);



app.get('/rp', redditRoute.rtop);

app.get('/ynew', hackerRoute.hnew);

app.get('/lnew', lobstersRoute.lnew);


app.get('/rnew', redditRoute.rnew);



app.set('views', __dirname + '/views'); // sets dir

app.set('view engine', 'jade'); // tells express to use jade



app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.render('main',
      { title : 'Home' }
    );
});

app.listen(PORT);
