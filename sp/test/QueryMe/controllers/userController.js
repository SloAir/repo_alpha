const UserModel = require('../models/userModel.js');
const data = require('../public/js/data/data');

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({_id: id}.exec((err, user) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    // TODO: redirect to page_404
                    message: 'No such user'
                });
            }

            return res.json(user);
        }));
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        const user = new UserModel({
            username: req.body.username,
            password: req.body.password,
            userData: {
                email: req.body.email
            }
        });

        user.save()
            .then(user => {
                return res.redirect('/users/register_success');
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            });
    },

    /**
     *
     * userController.update()
     */
    update: function (req, res) {
        const id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if(!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        const id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if(err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    showRegister: function(req, res) {
        res.render('user/register', {
            title: 'Sign up',
            formItems: data.registrationFormItems
        });
    },

    showRegisterSuccess: function(req, res) {
        res.render('user/register_success', {
            title: 'QueryMe'
        });
    },

    showLogin: function(req, res) {
        res.render('user/login', {
            title: 'Login',
            formItems: data.loginFormItems
        });
    },

    showLoginSuccess: function(req, res) {
        res.render('user/login_success', {
            title: 'QueryMe'
        });
    },

    showLogoutSuccess: function(req, res) {
        res.render('user/logout_success', {
            title: 'QueryMe',
        });
    }
};
