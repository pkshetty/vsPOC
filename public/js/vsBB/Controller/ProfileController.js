/**
 * vsBBProfileController
 */
define('vsBB/Controller/ProfileController', ['vsBB/Model/ProfileModel', 'vsBB/View/ProfileView', 'jquery'],
    function (ProfileModel, ProfileView, $) {

  function ProfileController(options) {
    this.options = $.extend({}, options);
  }

  ProfileController.prototype.render = function () {
    var model = new ProfileModel(this.options);
    new ProfileView({
      "el": $('#' + this.options.vsParentDOMId),
      "modOpts": this.options,
      "model": model
    });
  };

  return ProfileController;
});
