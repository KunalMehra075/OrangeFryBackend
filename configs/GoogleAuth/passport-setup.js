const passport = require("passport")
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth2").Strategy

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});

let GOOGLE_CLIENT_ID = "412668391513-ap8d330d1thbq6moca13bkp7kf99ksqq.apps.googleusercontent.com"
let GOOGLE_CLIENT_SECRET = "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"
let GOOGLE_CALLBACK_URL = "https://orangefry.netlify.app/google/callback"

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true
}, (request, accessToken, refrestToken, profile, done) => {
    // console.log(profile);//! -------> Consoling profile in server
    return done(null, profile)
}))