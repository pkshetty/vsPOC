require.config({
    paths: {
        'jquery': '/javascripts/lib/jquery',
        'underscore': '/javascripts/lib/underscore',
        'hogan': '/javascripts/lib/underscore',
        'backbone': '/javascripts/lib/backbone',
    },
    shim: {
        'jquery': {
            exports: '$',
        },
        'underscore': {
            exports: '_',
        },
        'backbone': {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone',
        }
    }
});

require(['vsBB/vsBBInit'], function(vsBBInit) {
    vsBBInit.init();
});