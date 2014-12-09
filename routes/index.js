var express = require('express');
var jf = require('jsonfile');
var path = require('path');
var router = express.Router();


// // route middleware that will happen on every request
// router.use(function(req, res, next) {

// 	// log each request to the console
// 	console.log("----------------",req.method, req.url);

// 	// continue doing what we were doing and go to the route
// 	next();	
// });


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*
 * GET cp data.
 */
router.get('/cp', function(req, res) {
	var file = path.join(__dirname, '../data/cprofile_goog.json');
	console.log("file----------->", file);
	jf.readFile(file, function(err, obj) {
  		//res.json(obj);
  		//console.log("wwwwwwwwww------>>", obj);
  		res.render('../views/cprofile', {"entityId":"entityId123"});
  		//res.render('cprofile', obj);
	});
});

module.exports = router;
