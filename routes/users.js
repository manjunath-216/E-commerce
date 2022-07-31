const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(users.register)

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/login', failureMessage: true,
    keepSessionInfo: true,}), users.login)

router.get('/logout', users.logout)

router.get('/users/:id/products', users.showProducts)

module.exports = router;