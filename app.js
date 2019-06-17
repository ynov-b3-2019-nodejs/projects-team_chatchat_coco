const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const bodyparser = require('body-parser');
const mult = require('multer');

const app = express();
const http = require('http').createServer(app);

mongoose.connect('mongodb://localhost/chat_coco', {useCreateIndex: true, useNewUrlParser: true});
require('./models/User');

const ONE_HOUR = 1000 * 60 * 60;
const {
    SESS_NAME = 'session_id',
    SESS_SECRET = 'ssh!quiet,it\'asecret!',
    SESS_LIFETIME = ONE_HOUR
} = process.env;


app.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
    }
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use('/public', express.static('public'));
app.use('/scripts', express.static('scripts'));
app.use(require('./routes/routes'));

nunjucks.configure('public/views', {
    autoescape: true,
    express: app
});

const io = require('socket.io')(http);

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

const port = (process.env.PORT || '3000');

http.listen(port, () => console.log('listening...'));
