/*
 * * Module dependencies
 * */
let express = require('express');
require('dotenv').config();
let lobstersRoute = require('./routes/lobsters.js');
let redditRoute = require('./routes/reddit.js');
let hackerRoute = require('./routes/hackernews.js');
let swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger/swagger.json');

var app = express(); // sets up the server

var PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/ycomb', hackerRoute.htop);


app.get('/lobster', lobstersRoute.ltop);



app.get('/rp', redditRoute.rtop);

app.get('/ynew', hackerRoute.hnew);

app.get('/lnew', lobstersRoute.lnew);


app.get('/rnew', redditRoute.rnew);

app.get('/status', function (req, res) {
  return res.status(200).send('ok');
});

app.set('views', __dirname + '/views'); // sets dir

app.set('view engine', 'jade'); // tells express to use jade



app.use(express.static(__dirname + '/public'));


app.get('/', function (req, res) {
  res.render('main',
      { title : 'Home' }
    );
});




app.listen(PORT);
