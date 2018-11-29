var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});




module.exports = router;
