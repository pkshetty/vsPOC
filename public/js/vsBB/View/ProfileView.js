/*global document setTimeout clearTimeout*/
/*
 * ProfileView
 */
define('vsBB/View/ProfileView', ['backbone', 'hogan', 'jquery'],
  function (Backbone, Hogan, $) {
    var ProfileView = Backbone.View.extend({

      cfg: {

        'stepChoicePartial': 'script[data-template-id=_step-choice]',
        'stepRightPartial': 'script[data-template-id=_single_page_right]',
        'stepFooterPartial': 'script[data-template-id=_footer]',
        'stepCorPartial': 'script[data-template-id=_step-cor]',
        'emailBox': '#pi_email'
      },

      initialize: function (options) {
        console.log('initialize ProfileView');


      },
      events: function () {
        var events = {};
        events['blur ' + this.cfg.emailBox] = 'checkIdentity';
        
        return events;
      },
      checkIdentity: function () {
        var self = this;
        if ($(this.cfg.emailBox).val() === '') return;
      }
    });
    return ProfileView;
  });
