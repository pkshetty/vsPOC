/**
 * vsBBInit
 */
define('vsBB/vsBBInit', ['vsBB/vsBBController/LandingPageController', 'jquery'], function (landingPageController, $) {

  var vsBBInit = {

    options: {
      //add configs
      'vsParentDOMId': 'vsParentDOMId'
    },

    init: function (options) {
        console.log("init called>>>>");
      var self = this;
      $.extend(this.options, options);
      console.log("LandingPageView INIT CALLING");
      // console.log(this.options);
      var ctrlr = new landingPageController(this.options);
      ctrlr.render();
    }
  };
  return vsBBInit;
});