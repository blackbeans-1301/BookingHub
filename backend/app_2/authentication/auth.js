const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const db = require("../models/index.js")
const User = db.user;

const controllers = require("../controllers/controller.js")

const GOOGLE_CLIENT_ID = '440715256432-13f5l15eqea1pk8i7575es8cpq84sdc4.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.API_URL}/user/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {
        let condition = {
            email: profile.emails[0].value
        }

        let dataAccount;
        dataAccount = await controllers.FindManyData(User, condition)

        if (dataAccount.code === -2) {
            return cb(null, { message: "Failed to login", err: dataAccount.err });
        }

        // Nếu user chưa đăng ký
        if (!dataAccount.length) {
            // insert user info into database
            let value = {
                email: profile._json.email,
                firstName: profile._json.given_name,
                lastName: profile._json.family_name,
                member_since: controllers.GetCurrentDate(),
                gender: profile._json.gender,
                imgURL: profile._json.picture
            }

            let createdAccount = await controllers.CreateData(User, value);

            if (createdAccount.code === -2) {
                return cb(null, { message: "Failed to create account", err: createdAccount.err });
            }

            // tao token JWT
            let informationAuth = {
                email: createdAccount.email,
                user_id: createdAccount.user_id,
                isOwner: 0
            };

            const assessToken = jwt.sign(informationAuth, process.env.ACCESS_TOKEN_SECRET);
            return cb(null, assessToken);
        }

        // tao token JWT
        let informationAuth = {
            email: dataAccount[0].dataValues.email,
            user_id: dataAccount[0].dataValues.user_id,
            isOwner: 0
        };

        const assessToken = jwt.sign(informationAuth, process.env.ACCESS_TOKEN_SECRET);
        return cb(null, assessToken);
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