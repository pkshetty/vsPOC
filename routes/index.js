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
router.get('/', function(req, res, next) {
  //res.render('index.html', { title: 'Express11111',somevar: 'some variable' });
  //next();
  res.render('landing');
});

/*
 * GET cp data.
 */
router.get('/cp', function(req, res, next) {
	var file = path.join(__dirname, '../data/cprofile_goog.json');
	console.log("file----------->", file);
	jf.readFile(file, function(err, fileData) {
  		//res.json(fileData);
  		console.log("fileData------>>1234.................................");
  		//console.log("fileData------>>", fileData);
  		res.render('cprofile.html', {"entityId":"entityId123"});
  		//res.render('cprofile', obj);
      //next();
	});
});

module.exports = router;
