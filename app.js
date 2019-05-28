const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

mongoose.connect('mongodb://localhost/chat_coco', {useNewUrlParser: true});
require('./models/User');


const app = express();

app.use('/static', express.static('static'));
app.use(require('./routes/accueil'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.listen(3000);
