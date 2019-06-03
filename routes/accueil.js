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

router.post('/login', (req, res) => {
    console.log("begin");
    const userCredential = new User(req.body);
    userCredential.save().then(item => {
        console.log("item saved to database");
    })
        .catch(err => {
            console.log(err);
            res.status(400).send("unable to save to database");
        });
});

router.post('/login', (req, res) => {
    User.find({}).then(users => {
        res.render('index.html', {users: users});
    })
});


router.post('/logout', (req, res) => {
    User.find({}).then(users => {
        res.render('index.html', {users: users});
    })
});




module.exports = router;
