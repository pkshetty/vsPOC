'use strict';

var express = require('express');
var mainController = require('../controllers/main-controller');

module.exports = MainRouter;

function MainRouter() {
  var router = express.Router();

  router.get('/', mainController.index);
  return router;
}