var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  return res.render('summary/index',{title:"View"})
});

module.exports = router;
