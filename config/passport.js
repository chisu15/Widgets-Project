const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const User = require('../models/user.model');
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret_key',
};

passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload._id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        return done(error, false);
    }
}));

// passport.use(new GoogleStrategy({
//     clientID: 'your_google_client_id',
//     clientSecret: 'your_google_client_secret',
//     callbackURL: '/auth/google/callback',
// }, async (token, tokenSecret, profile, done) => {
//     try {
//         let user = await User.findOne({
//             googleId: profile.id
//         });
//         if (!user) {
//             user = new User({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 name: profile.displayName,
//                 role: 'user' // Mặc định là 'user'
//             });
//             await user.save();
//         }
//         return done(null, user);
//     } catch (error) {
//         return done(error, false);
//     }
// }));

// passport.use(new FacebookStrategy({
//     clientID: 'your_facebook_client_id',
//     clientSecret: 'your_facebook_client_secret',
//     callbackURL: '/auth/facebook/callback',
//     profileFields: ['id', 'displayName', 'emails'],
// }, async (token, tokenSecret, profile, done) => {
//     try {
//         let user = await User.findOne({
//             facebookId: profile.id
//         });
//         if (!user) {
//             user = new User({
//                 facebookId: profile.id,
//                 email: profile.emails[0].value,
//                 name: profile.displayName,
//                 role: 'user' // Mặc định là 'user'
//             });
//             await user.save();
//         }
//         return done(null, user);
//     } catch (error) {
//         return done(error, false);
//     }
// }));

module.exports = passport;