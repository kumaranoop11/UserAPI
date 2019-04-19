var usersRouter = require('../users/index');
var express = require('express');
var router = express.Router();
var authRouter = require('../authentication/index')
var authrization = require('../authorization/authorization')

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'fsffdsafdsafasfadsf' });
  res.send('Welcome to ...');
});

router.use('/auth', authRouter);

router.use('/users', authrization, usersRouter);

module.exports = router;
