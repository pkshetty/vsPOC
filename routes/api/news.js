var express = require('express');
var jf = require('jsonfile');
var path = require('path');
var router = express.Router();

/*
 * GET cp data.
 */
router.get('/:profileid', function (req, res) {
    console.log("file----------->", req.params.profileid);
    var file = path.join(__dirname, '../../data/cnews-' + req.params.profileid + '.json');
	console.log("file----------->", file);
	jf.readFile(file, function (err, obj) {
	    console.log(err);
  		res.json(obj);
	});
});


module.exports = router;
