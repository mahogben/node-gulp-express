'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const originConsoleLog = console.log;

app.set('socketio', io);

app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        partialsDir: ['views/partials/']
    })
);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.io = io;
  console.log = function (data) {
    res.io.emit('logging', data);
    originConsoleLog(data);
  };
  next();
});

app.use('/', index);

app.set('port', process.env.PORT || 5000);
app.set('ip', process.env.NODEJS_IP || 'localhost');

module.exports = { app, server }