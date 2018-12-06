var express = require('express');
var router = express.Router();
var indexController  = require('../controllers/indexController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Account Login|Prime ' });
});


/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Create Account|Prime ' ,referee_id:req.query.ref});
});



/* GET home page. */
router.get('/faqs', function(req, res, next) {
  res.render('faqs', { title: 'Frequently asked questions ' });
});


//============================POST ROUTES ================================//

//============sign up
router.post('/register',indexController.createUser);
module.exports = router;
