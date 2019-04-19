const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../users/UserModel');
const winston = require('../config/winston');

passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async function (email, password, done) {
    try {
        const user = await UserModel.create({ email, password });
        return done(null, user);
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            done(new Error('User already exists for username and/or email'));
            winston.stream.write('User already exists for username and/or email');
        } else {
            done(error);
        }
    }
}));

passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password'
}, async function(email, password, done){
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return done(null, false, {message : 'User not found'});
        }
        
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, {message : 'Wrong password'});
        }

        return done(null, user, {message:'Logged in successfully'});
    } catch (error) {
        done(error);
    }
}));