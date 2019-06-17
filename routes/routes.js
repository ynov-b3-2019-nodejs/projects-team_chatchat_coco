const router = require('express').Router();
const User = require('./../models/User');

router.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

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
    // find the user
    User.findOne({email: req.body.email}, function (err, user) {
        console.log(req.body.email);
        if (err) throw err;

        if (!user) {
            res.json({success: false, message: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };
                const token = jwt.sign(payload, app.get('superSecret'), {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    });
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
