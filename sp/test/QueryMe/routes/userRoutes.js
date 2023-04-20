const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const userController = require('../controllers/userController.js');

// get id
// router.get('/:id', userController.show);
// router.get('/', userController.list);
// route to correct registration pages
router.get('/register', userController.showRegister);
router.get('/register_success', userController.showRegisterSuccess);
router.get('/login', userController.showLogin);
router.get('/login_success', userController.showLoginSuccess);
router.get('/logout_success', userController.showLogoutSuccess);

// handle client-side validation
router.post('/validate_username', function(req, res) {
    const username  = req.body.username;

    UserModel.findOne({ username: username }).then((user) => {
        if(user) {
            // The username already exists in the database
            res.json({ exists: true });
        }
        else {
            // The username is available
            res.json({ exists: false });
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

router.post('/validate_email', function(req, res) {
    const email = req.body.email;

    UserModel.findOne({ email: email }).then((userEmail) => {
         if(userEmail) {
             res.json({ exists: true });
         }
         else {
             res.json({ exists: false });
         }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

router.post('/check_username', function(req, res) {
    const username  = req.body.username;

    UserModel.findOne({ username: username }).then((user) => {
        if(user) {
            // The username already exists in the database
            res.json({ exists: true });
        }
        else {
            // The username is available
            res.json({ exists: false });
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

router.post('/validate_login', function(req, res) {
    const { username, password } = req.body;

    UserModel.findOne({ username: username }).then((user) => {
        if(!user) {
            return res.status(401).json({
                error: "Invalid username."
            });
        }

        const match = bcrypt.compare(password, user.password);

        if(!match) {
            return res.status(401).json({
                error: "Invalid password."
            })
        }

        req.session.user = {
            username: username
        }

         res.redirect('login_success');

    }).catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('logout_success');
        }
    });
});

/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
