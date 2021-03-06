var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let testRouter = require('./routes/test');
let categoriesRouter = require('./routes/categories');
let postsRouter = require('./routes/posts');
let tagsRouter = require('./routes/tags');
let chatsRouter = require('./routes/chats');

var app = express();
app.io = require('socket.io')();

app.use(logger('dev'));
app.use(cors()); // allow request comming from anywhere !!! DEV ONLY
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/test', testRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/chats', chatsRouter(app.io));

module.exports = app;
