'use strict';

var ERROR_INCORRECT_PARAMS = new Error('Incorrect parameters');
var offersService = require('../services/offers-service');
var paymentSessionIdService = require('../services/payment-session-id-service');
var externalOffersService = require('../services/external-offers-service');
var externalLinksService = require('../services/external-links-service');
var securityQuestionService = require('../services/security-question-service');
var countryService = require('../services/country-service');
var stateProvinceService = require('../services/stateProvince-service');
var Promise = require('bluebird'); // jshint ignore:line
var identityDelegate = require('commerce.request').getService('http',
  'identityEndpoint');
var eligibilityDelegate = require('commerce.request').getService('http',
  'eligibilityEndpoint');
var config = require('config');
var apiPaymentBase = config.devops.apiPaymentBase;
var startReadingNowHomePageUrl = config.startReadingNowHomePageUrl;

// Main function for the controller.
exports.index = function (req, res, next) {
  console.log(isAuthenticated(req));
  if (!req.params || !req.params.pageId || !req.params.lang) {
    throw(ERROR_INCORRECT_PARAMS);
  }

  // Assume a user is eligible unless the check tells us they are not
  var isEligible = true;
  var identity = false;

  // Check the req using the user's UUID (from cookies) on whether they are
  // eligible for a subscription
  getEligibility(req)
    .then(function (response) {
      isEligible = response;
    })
    .then(function () {
      // Check to see if the user's identity profile includes a security
      // question and answer
      return getIdentity(req);
    })
    .then(function (response) {
      identity = response;
    })
    .then(function () {
      // Read data form the fake cms and offers service
      return getData(req.params);
    })
    .then(function (data) {
      data.trackingCode = resolveToDefaultTrackingCode(req, data);
      data.isEligible = isEligible;
      data.identity = identity;
      data.isAuthenticated = isAuthenticated(req);
      data.apiPaymentBase = apiPaymentBase;
      data.startReadingNowHomePageUrl = startReadingNowHomePageUrl;
      res.render('main/index', data);
    }).catch(function (err) {
      console.log(err);
      next();
    });
};

// Returns the data for the index template.
function getData(params) {
  var response = {};

  return offersService.getOffers(params.pageId)
    .then(function (page) {
      response.offers = page;
    })
    .then(externalLinksService.getUrls)
    .then(function (externalLinks) {
      response.externalLinks = externalLinks;
    })
    .then(securityQuestionService.getSecurityQuestions)
    .then(function (data) {
      response.securityQuestions = data;
    })
    .then(paymentSessionIdService.getSessionId)
    .then(function (data) {
      response.paymentSessionId = data;
    })
    .then(externalOffersService.getUrls)
    .then(function (externalOffers) {
      response.externalOffers = externalOffers;
    })
    .then(countryService.getCountry)
    .then(function (countries) {
      response.countries = countries;
    })
    .then(stateProvinceService.getProvince)
    .then(function (provinces) {
      response.provinces = provinces;
    })
    .then(stateProvinceService.getPrefecture)
    .then(function (prefectures) {
      response.prefectures = prefectures;
    })
    .then(stateProvinceService.getState)
    .then(function (stateProvinces) {
      response.stateProvinces = stateProvinces;

      response.deliveryStates = [];
      stateProvinces.forEach(function (state) {
        if (state && state.paperDeliveryAvailable) {
          response.deliveryStates.push(state);
        }
      });

      return response;
    });
}

function getEligibility(req) {
  var uuid = getUserUuid(req);
  if (!uuid) {
    return Promise.resolve(true);
  }

  return eligibilityDelegate.getEligibility({
    params: {
      uuid   : uuid,
      offerId: 1045400006
    }
  }).
    then(function (response) {
      return response && response.body && response.body.eligible && true;
    });
}

function getIdentity(req) {
  var uuid = getUserUuid(req);
  if (!uuid) {
    return Promise.resolve(false);
  }

  var opts = {
    params: {
      uuid: uuid
    }
  };
  return identityDelegate.getIdentity(opts).
    then(function (response) {
      var identity = response.body;
      identity.hasSecurityQuestionAndAnswer =
        identity.securityQuestion &&
        identity.securityQuestion.length > 0 &&
        identity.securityQuestion[0].securityAnswer &&
        identity.securityQuestion[0].securityQuestionText &&
        true;
      identity.securityQuestion = void(0);

      return identity;
    });
}

// Resolves a tracking code by first looking on the request's query string,
// then in the page data defaultTracking property, finally returning 'none' if
// not found.
function resolveToDefaultTrackingCode(req, data) {
  if (req && req.query && req.query.trackingCode) {
    return req.query.trackingCode;
  } else if (data && data.offers && data.offers.defaultTracking) {
    return data.offers.defaultTracking;
  }
  return 'none';
}

// Returns the user's UUID based on the request cookie, or returns undefined
function getUserUuid(req) {
  if (!req || !req.cookies || !req.cookies.REMOTE_USER) {
    return;
  }
  return req.cookies.REMOTE_USER;
}

// Returns true if the user is authenticate (via the request cookie)
function isAuthenticated(req) {
  return getUserUuid(req) && true;
}

function out(obj) {
  console.log('\n\n\n');
  console.log('----------');
  console.log(JSON.stringify(obj, null, 1));
  console.log('----------');
  console.log('\n\n\n');
}