/*global document setTimeout clearTimeout*/
/*
 * vsBBProfileView
 */
define('vsBB/View/InvestmentByRegionView', ['backbone', 'hogan', 'jquery', 'custom'],
  function (Backbone, Hogan, $,custom) {
      var InvestmentByRegionView = Backbone.View.extend({

      cfg: {       
          'barChart': '#bars-static li .bar',
          'barChartEurope': '#month',
          'barChartUSA': '#week',
          'usamap': '.usa-map',
          'europemap': '.europemap',
          'bar1': '#bars li .bar1',
          'bar2': '#bars li .bar2',
          'bar3': '#bars li .bar3',
          'bar4': '#bars li .bar4',
          'bar5': '#bars li .bar5',
          'bar': '#bars li .bar'
      },
     
      initialize: function (options) {
          console.log('initialize InvestmentByRegionView');

        $(this.cfg.barChart).each(function (key, bar) {
            var percentage = $(this).data('percentage') / 2;

            $(this).animate({
                'height': percentage + '%'
            }, 1000);
        });

        $(this.cfg.barChartUSA).on('change', this.changeGraphValEurope(), this);
        $(this.cfg.barChartEurope).on('change', this.changeGraphValUSA(), this);
      },
      
      events: {
          "change #month": "changeGraphValEurope",
          "change #week": "changeGraphValUSA"
      },
      changeGraphValUSA: function () {
          console.log('initialize changeGraphValUSA');
          var arr = [172, 169, 106, 84, 80];
        $(this.cfg.bar1).attr('data-percentage', arr[0]);
        $(this.cfg.bar2).attr('data-percentage', arr[1]);
        $(this.cfg.bar3).attr('data-percentage', arr[2]);
        $(this.cfg.bar4).attr('data-percentage', arr[3]);
        $(this.cfg.bar5).attr('data-percentage', arr[5]);

        var i = 0;

        $(this.cfg.bar).each(function (key, bar) {
            var percentage = arr[i] / 2;
            $(this).animate({
                'height': percentage + '%'
            }, 1000);
            i = i + 1;
        });
        $(this.cfg.europemap).css('display', 'none');
        $(this.cfg.usamap).css('display', 'table');
      },
      changeGraphValEurope: function () {
          var arr = [136, 183, 29, 169, 125];
          $(this.cfg.bar1).attr('data-percentage', arr[0]);
          $(this.cfg.bar2).attr('data-percentage', arr[1]);
          $(this.cfg.bar3).attr('data-percentage', arr[2]);
          $(this.cfg.bar4).attr('data-percentage', arr[3]);
          $(this.cfg.bar5).attr('data-percentage', arr[5]);

          var i = 0;

          $(this.cfg.bar).each(function (key, bar) {
              var percentage = arr[i] / 2;
              $(this).animate({
                  'height': percentage + '%'
              }, 1000);
              i = i + 1;
          });
          $(this.cfg.europemap).css('display', 'table');
          $(this.cfg.usamap).css('display', 'none');
      },
     
    });
      return InvestmentByRegionView;
  });

