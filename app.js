const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');
const bodyparser = require('body-parser');
const mult = require('multer');

mongoose.connect('mongodb://localhost/chat_coco', {useNewUrlParser: true});
require('./models/User');

const app = express();
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
app.use(require('./routes/accueil'));

nunjucks.configure('public/views', {
    autoescape: true,
    express: app
});

app.listen(3000);
