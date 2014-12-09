var express = require('express');
var jf = require('jsonfile');
var path = require('path');
var router = express.Router();

/*
 * GET cp data.
 */
router.get('/cp', function(req, res) {
	var file = path.join(__dirname, '../data/cprofile_goog.json');
	console.log("file----------->", file);
	jf.readFile(file, function(err, obj) {
  		//res.json(obj);
  		res.render('cprofile', obj);
	});
});

module.exports = router;