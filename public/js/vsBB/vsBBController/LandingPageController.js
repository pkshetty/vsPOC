/**
 * vsBBProfileController
 */
define('vsBB/Controller/LandingPageController',
    ['vsBB/Model/LandingPageModel',
     'vsBB/View/LandingPageView', 'jquery'],
    function (LandingPageModel, LandingPageView, $) {

    function LandingPageController(options) {
    this.options = $.extend({}, options);
  }

    LandingPageController.prototype.render = function () {
        var model = new LandingPageModel(this.options);
        new LandingPageView({
      "el": $('#' + this.options.vsParentDOMId),
      "modOpts": this.options,
      "model": model
    });
  };

    return LandingPageController;
});
