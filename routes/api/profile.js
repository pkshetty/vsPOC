var express = require('express');
var jf = require('jsonfile');
var path = require('path');
var router = express.Router();

/*
 * GET cp data.
 */
router.get('/:id', function (req, res) {
    console.log("req.params.id ----------->", req.params.id);
    var file = path.join(__dirname, '../../data/cprofile-' + req.params.id + '.json');
	console.log("file----------->", file);
	jf.readFile(file, function (err, obj) {
	    console.log(obj);
  		res.json( obj);
	});
});

router.get('/:ids', function (req, res) {
    var file = path.join(__dirname, '../../data/cprofile-' + req.params.ids + '.json');
    console.log("file----------->", file);
    jf.readFile(file, function (err, obj) {
        //res.json(obj);

        res.json('cprofile', obj);
    });
});
module.exports = router;
