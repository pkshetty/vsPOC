/**
 * vsBBProfileController
 */
define('vsBB/Controller/InvestmentByRegionController', ['vsBB/Model/InvestmentByRegionModel',
    'vsBB/View/InvestmentByRegionView', 'jquery'], function (InvestmentByRegionModel, InvestmentByRegionView, $) {

    function InvestmentByRegionController(options) {
    this.options = $.extend({}, options);
  }

    InvestmentByRegionController.prototype.render = function () {
        var model = new InvestmentByRegionModel(this.options);
        new InvestmentByRegionView({
          "el": $('#' + this.options.vsParentDOMId),
          "modOpts": this.options,
          "model": model
        });
  };

    return InvestmentByRegionController;
});
