const express = require("express");
const GoogleRouter = express.Router()
const passport = require("passport");
const bcrypt = require("bcrypt")
require("dotenv").config();
const jwt = require("jsonwebtoken")
const { UserModel } = require("../models/users.model");

let HOST = "https://orangefry.netlify.app"

require("../configs/GoogleAuth/passport-setup")
GoogleRouter.get('/', passport.authenticate('google', { scope: ['email', "profile"] }));

GoogleRouter.get('/callback',
    passport.authenticate('google', {
        successRedirect: '/google/auth/google/success',
        failureRedirect: '/google/auth/google/failure'
    })
);
// !GOOGLE AUTH SUCCESS
GoogleRouter.get('/auth/google/success', async (req, res) => {
    if (!req.user) {
        return res.redirect('/google/auth/google/failure');
    }
    let googledata = {
        name: req.user.displayName,
        email: req.user.email,
        gender: req.user.email,
        mobile: 9 + req.user.id.substring(0, 9),
        image: req.user.photos[0].value,
        pass: req.user.email,
        role: "Explorer"
    }
    // console.log(googledata);
    try {
        let user1 = await UserModel.find({ email: googledata.email });
        let user2 = await UserModel.find({ name: googledata.name });
        if (user1.length || user2.length) {
            console.log("FoundInDB", user1[0] || user2[0])//!----> User Already Exists in DB  
            res.redirect(`${HOST}/OrangeFryFrontend/success.html?successId="${user2[0]._id}"`)
        } else {
            bcrypt.hash(googledata.pass, 5, async function (err, hash) {
                if (hash) {
                    googledata.pass = hash;
                    const instance = new UserModel(googledata);
                    await instance.save();
                    console.log("NewCreated", instance)//!----> New User Created in DB by google
                    res.redirect(`${HOST}/OrangeFryFrontend/success.html?successId="${instance._id}"`)
                } else {
                    console.log(err);
                    res.redirect(`${HOST}/OrangeFryFrontend/failure.html?failure="${err.message.join("+")}"`)
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.redirect(`${HOST}/OrangeFryFrontend/failure.html?failure="${err.message.join("+")}"`)
    }

});

// !GOOGLE AUTH FAILURE
GoogleRouter.get('/auth/google/failure', (req, res) => {
    res.redirect(`${HOST}/OrangeFryFrontend/failure.html`)
})


// ?GOOGLE AUTH LOGIN
GoogleRouter.post('/login', async (req, res) => {
    let userID = req.body.userID
    let user = await UserModel.findOne({ _id: userID });
    jwt.sign({ user }, process.env.key, (err, token) => {
        if (token) {
            res.json({
                Message: "Google Login Successful",
                Wrong: false, token, user,
            });
        } else {
            res.json({ Message: "JWT error", Wrong: true });
        }
    });
})
// ! GOOGLE AUTH LOGOUT
GoogleRouter.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.json({ Message: "Logged Out Successfully", logout: true });
})
module.exports = { GoogleRouter };