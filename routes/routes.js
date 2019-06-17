const router = require('express').Router();
const User = require('./../models/User');


router.get('/', (req, res) => {
    User.find({}).then(users => {
        res.render('index.html', {users: users});
    })
});

router.get('/home', (req, res) => {
        res.render('index.html');
});

router.get('/login', (req, res) => {
    User.find({}).then(users => {
        res.render('login.html', {users: users});
    })
});

router.get('/register', (req, res) => {
    User.find({}).then(users => {
        res.render('register.html', {users: users});
    })
});

router.get('/chat', (req, res) => {
    User.find({}).then(users => {
        res.render('chat.html', {users: users});
    })
});

router.post('/login', (req, res) => {
    if (req.body.email &&
        req.body.password) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
        };
        User.findOne(userData, function (err, user) {
            if (err) {
                console.error(err)
            } else {
                return res.redirect('/chat');
            }
        });
    }
});

router.post('/register', (req, res) => {

    if (req.body.email &&
        req.body.pseudo &&
        req.body.age &&
        req.body.sexe &&
        req.body.password) {
        const userData = {
            email: req.body.email,
            password: req.body.password,
            pseudo: req.body.pseudo,
            age: req.body.age,
            sexe: req.body.sexe
        };
        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err) {
                console.error(err)
            } else {
                return res.redirect('/chat');
            }
        });
    }
});


router.post('/logout', (req, res) => {
    User.find({}).then(users => {
        res.render('index.html', {users: users});
    })
});

router.post('/post', (req, res) => {
    User.find({}).then(users => {
        res.render('index.html', {users: users});
    })
});



module.exports = router;
