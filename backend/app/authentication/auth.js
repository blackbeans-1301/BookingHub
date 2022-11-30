const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require("../models/index.js")
const User = db.user;

const GOOGLE_CLIENT_ID = '440715256432-13f5l15eqea1pk8i7575es8cpq84sdc4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/user/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        User.findAll({
            where: {
                email: profile.emails[0].value
            }
        }).then(data => {
            let informationAuth

            if (!data.length) {
                 informationAuth = {
                    authenticated: false,
                    email: profile._json.email,
                    first_name: profile._json.given_name,
                    last_name: profile._json.family_name
                }
            } else {
                informationAuth = {
                    authenticated: true,
                    user_id: data[0].dataValues.user_id,
                    email: data[0].dataValues.email,
                    isOwner: data[0].dataValues.isOwner
                }
            }
            
            return cb(null, informationAuth);
        }).catch(err => {
            
        })
    }
));

// lưu vào req.session.passport
passport.serializeUser(function (user, done) {
    done(null, user);
});

// lưu vào req.user
passport.deserializeUser(function (user, done) {
    done(null, user);
});