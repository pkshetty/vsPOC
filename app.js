var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var web = require('./routes/index');
var apiSearch = require('./routes/api/search');
var apiProfile = require('./routes/api/profile');
var app = express();

/*//  templates directory to 'views'
app.set('views', __dirname + '/views');

// setup template engine - we're using Hogan-Express
app.set('view engine', 'html');
app.set('layout', 'layout');
app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express
*/

mustacheExpress = require('mustache-express');
app.engine('html', mustacheExpress());          // register file extension mustache

app.set('view engine', 'html');                 // register file extension for partials
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', web);
app.use('/api/profile', apiProfile);
app.use('/api/search', apiSearch);
//app.use('/cp', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("req.url-----", req.url);
    var err = new Error('Not Found');
    err.status = 404;
    console.log("Error---->", err);
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        console.log("dev...req.url-----", req.url);
        console.log("err-----------", err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    console.log("prod...req.url-----", req.url);
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
