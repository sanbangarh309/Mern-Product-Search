var express = require('express');
var session = require('express-session')
var app = express();
var db = require('./db');
var port = process.env.PORT || 4200;
var server = require('http').createServer(app);
var http = require("http").Server(express)
// app.set('view engine', 'ejs');
app.use(session({secret: 'bangarh',resave: true,
    saveUninitialized: true}));
// var user = require('./api/models/VantageModel');

var ProductController = require('./controllers/ProductController');
app.use('/products', ProductController);

// var ChatController = require('./admin/controllers/ChatController');
// app.use('/chats', ChatController);

var UserController = require('./controllers/UserController');
app.use('/users', UserController);

var routes = require('./routes/Routes');
routes(app);

server.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
