const JwtStategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const usersData = require('../data').users;
const key = 'super_secret_key'

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: key
}

module.exports = passport => {
    passport.use(
        new JwtStategy(options, async (payload, done) => {
            try {
                const user = usersData.find(u => u.email === payload.email);
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