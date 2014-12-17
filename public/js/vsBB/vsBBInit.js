/**
 * vsBBInit
 */
define('vsBB/vsBBInit', ['vsBB/vsBBController/vsBBProfileController', 'jquery'], function (vsBBProfileController, $) {

  var vsBBInit = {

    options: {
      //add configs
      'vsParentDOMId': 'vsParentDOMId'
    },

    init: function (options) {
      alert("init called>>>>");
      var self = this;
      $.extend(this.options, options);
      console.log("vsBBProfileController INIT CALLING");
      // console.log(this.options);
      var ctrlr = new vsBBProfileController(this.options);
      ctrlr.render();
    }
  };
  return vsBBInit;
});