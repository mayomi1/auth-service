const express = require('express');

const AuthController = require('./controllers/authentication');
const passport = require('passport');
const passportService = require('./config/passport');
const knownError = require('./config/helper').knownError;


// Middleware to require login/auth
/**
 * Plug this to any route that requires authentication
 * @param req
 * @param res
 * @param next
 */
const requireAuth = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, function(err, user){
		if(!user) {
			return knownError(res, 'Invalid user details');
		}
		req.user = user;
		return next();
	})(req, res, next);
}

/**
 * Plug this to the login route
 * @param req
 * @param res
 * @param next
 */
const requireLogin = (req, res, next) => {
	passport.authenticate('local', { session: false } , function(err, user){
		if(!user) {
			return knownError(res, 'Invalid user details');
		}
		req.user = user;
		return next();
	})(req, res, next);
}

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
