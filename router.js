const express = require('express');

const AuthController = require('./controllers/authentication');
const passport = require('passport');
const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express.Router();
    const authRoutes = express.Router();


    apiRoutes.use('/auth', authRoutes);
    // route to  auth
    authRoutes.post('/register', AuthController.register);
    authRoutes.post('/login', requireLogin, AuthController.login);

// Set url for API group routes
    app.use('/api', apiRoutes);
};
