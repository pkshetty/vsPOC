/**
 * vsBBProfileModel
 */
define('vsBB/Model/InvestmentByRegionModel', ['backbone', 'jquery'],

  function (Backbone, $) {
      var InvestmentByRegionModel = Backbone.Model.extend({
      init: function (options) {
        this.cfg = $.extend({}, this.OPTIONS_CONFIG, options);
        console.log('initialize InvestmentByRegionModel');

      },
      OPTIONS_CONFIG: {
        'profileSvc': '/svc/rt/headlines?count=3&filterCode='
      },
      dispose: function () {
        this.unbind();
        this.off();
      }
    });
      return InvestmentByRegionModel;
  });
