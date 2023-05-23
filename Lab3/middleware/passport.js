const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const key = 'super_secret_key'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
}

module.exports = passport => {
    passport.use(
        new JwtStategy(options, async (payload, done) => {
            try {
                const user = User.findById(payload.userId).select('email id');
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    )
}