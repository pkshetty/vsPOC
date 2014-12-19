/**
 * vsBBProfileModel
 */
define('vsBB/Model/LandingPageModel', ['backbone', 'jquery'],

  function (Backbone, $) {
      var LandingPageModel = Backbone.Model.extend({
      init: function (options) {
        this.cfg = $.extend({}, this.OPTIONS_CONFIG, options);

      },
      OPTIONS_CONFIG: {
        'profileSvc': '/svc/rt/headlines?count=3&filterCode='
      },
      dispose: function () {
        this.unbind();
        this.off();
      }
    });
      return LandingPageModel;
  });
