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
    var page = { title: 'VSPOC',page: 'Home',iconURL:'images/globalElements/dow-jones-icon.png' };
    res.render('Home/landing', page);
});

/*
 * GET cp data.
 */
router.get('/company', function (req, res, next) {
    //res.render('index.html', { title: 'Express11111',somevar: 'some variable' });
    //next();
    var page = { title: 'VSPOC', page: 'Company', iconURL: 'images/globalElements/dow-jones-icon.png' };
    res.render('Profile/profilePage', page);
});
module.exports = router;
