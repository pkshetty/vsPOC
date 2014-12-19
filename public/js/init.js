require.config({
    paths: {
        'jquery': 'vendor/jquery-1.11.1.min',
        'text': 'lib/require-text',
        'bootstrap': 'vendor/bootstrap.min',
        'custom':'custom/custom',
        'underscore': 'lib/underscore',
        'hogan': 'lib/underscore',
        'backbone': 'lib/backbone'
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
