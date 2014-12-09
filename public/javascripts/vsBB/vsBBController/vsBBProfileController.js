/**
 * vsBBProfileController
 */
define('vsBB/vsBBController/vsBBProfileController', ['vsBB/vsBBModel/vsBBProfileModel', 'vsBB/vsBBView/vsBBProfileView', 'jquery'], function (vsBBProfileModel, vsBBProfileView, $) {

  function vsBBProfileController(options) {
    this.options = $.extend({}, options);
  }

  vsBBProfileController.prototype.render = function () {
    var model = new vsBBProfileModel(this.options);
    new vsBBProfileView({
      "el": $('#' + this.options.vsParentDOMId),
      "modOpts": this.options,
      "model": model
    });
  };

  return vsBBProfileController;
});