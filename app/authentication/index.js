var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({'name': 'Authservice called'});
});

router.post('/signup', async (req, res, next) => {
    passport.authenticate('signup', {session:false}, async (err, user, info) => {
        try {
            if (err || !user) {
                return next(err);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) {
                    next(error);
                }

                const body = {
                    _id: user.id,
                    email: user.email
                };

                const token = jwt.sign({ user: body }, config.secret);
                return res.json({
                    message: 'Signup successfull',
                    user: user,
                    token: token
                });

            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.post('/', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occured');
                return next(error);
            }

            req.login(user, {session: false}, async (error) => {
                if (error) {
                    next(error);
                }

                const body = {
                    _id: user.id,
                    email: user.email
                };

                const token = jwt.sign({user: body}, config.secret);
                return res.json({token});

            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

module.exports = router;
