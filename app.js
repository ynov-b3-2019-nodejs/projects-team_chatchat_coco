const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const bodyparser = require('body-parser');
const mult = require('multer');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
const http = require('http').createServer(app);

app.use(morgan('dev'));

mongoose.connect('mongodb://heroku_9ps4kpj8:pviab5bpc7ksms1vh9qoa11ctc@ds239157.mlab.com:39157/heroku_9ps4kpj8', {
    useCreateIndex: true,
    useNewUrlParser: true
});
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
app.use(bodyparser.urlencoded({extended: true}));
app.use('/static', express.static('static'));
app.use('/public', express.static('public'));
app.use('/scripts', express.static('scripts'));
app.use(require('./routes/routes'));

nunjucks.configure('public/views', {
    autoescape: true,
    express: app
});

const io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

const port = (process.env.PORT || '3000');

http.listen(port, () => console.log('listening...'));
