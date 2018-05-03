/**
 * Created by mayomi on 5/3/18 by 5:34 PM.
 */
'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/main');
const CONSTANT = require('../config/constant');
const setUserInfo =  require('../config/helper').setUserInfo;

// Generate JWT
const generateToken = (user) => {
    return jwt.sign(user, config.secret, {
        expiresIn: 604800 // in seconds
    });
};

//= =======================================
// Login Route
//= =======================================
exports.login = (req, res) => {
    const userInfo = setUserInfo(req.user);
    return res.status(200).json({
        status: true,
        token: `Bearer ${generateToken(userInfo)}`,
        user: userInfo
    });
};

//= =======================================
// Registration Route
//= =======================================
exports.register = (req, res) => {
    const { email, password } = req.body;

    // Return error if no email provided
    if (!email) {
        return res.json({
            status: false,
            message: CONSTANT.emailErr });
    }
    // Return error if no password provided
    if (!password) {
        return res.json({
            status: false,
            message: CONSTANT.passwordErr });
    }

    User.findOne({ email }).then((existingUser) => {
        if (existingUser) {
            return res.json({
                status: false,
                message: CONSTANT.emailExist
            });
        }
        // If email is unique and password was provided, create account
        const user = new User({
            email,
            password,
        });

        user.save().then((user) => {
            const userInfo = setUserInfo(user);

            res.status(201).json({
                status: true,
                token: `Bearer ${generateToken(userInfo)}`,
                user: userInfo
            });
        }).catch((error) => {
            return res.json({
                status: false,
                message: CONSTANT.unknownError,
                error: error
            })
        })


    }).catch((error) => {
        return res.json({
            status: false,
            message: CONSTANT.unknownError,
            error: error.stack
        });
    });
};