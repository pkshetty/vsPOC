/*global document setTimeout clearTimeout*/
/*
 * vsBBProfileView
 */
define('vsBB/View/LandingPageView', ['backbone', 'hogan', 'jquery',
    'text!../../../investmentbyregion.html', 'vsBB/Controller/InvestmentByRegionController'],
  function (Backbone, Hogan, $,template,InvestmentByRegionController) {
      var LandingPageView = Backbone.View.extend({

      cfg: {
        'invfbyregion': '.center-pane-blue-surround.invf'
      },
          
      initialize: function (options) {
          console.log('initialize LandingPageView');
          this.afterRender();
          var ctrlr = new InvestmentByRegionController();
          ctrlr.render();
      },
      events: function () {
          var events = {};
          //events['onclick ' + this.cfg.invfbyregion] = 'loadInvestByRegion';

          return events;         
      },
      afterRender: function () {
         
          var html = _.template(template, '');
          $(this.cfg.invfbyregion).html(html);
          
      },
    });
      return LandingPageView;
  });
