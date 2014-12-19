var express = require('express');
var jf = require('jsonfile');
var path = require('path');
var router = express.Router();

/*
 * GET cp data.
 */
router.get('/:criteria', function(req, res) {
	var file = path.join(__dirname, '../../data/result.json');
	console.log("file----------->", file);
	jf.readFile(file, function(err, obj) {	 
  		res.json(obj);
	});
});


module.exports = router;
