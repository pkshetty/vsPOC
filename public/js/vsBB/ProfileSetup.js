/**
 * vsBBInit
 */
define('vsBB/ProfileSetup', ['vsBB/Controller/ProfileController', 'jquery'], function (profileController, $) {

    var ProfileSetup = {

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
      var ctrlr = new profileController(this.options);
      ctrlr.render();
    }
  };
  return ProfileSetup;
});
