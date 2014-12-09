var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var mustacheExpress = require('mustache-express');
//var expressHbs = require('express-handlebars');
var exphbs = require('express-handlebars');

var routes = require('./routes/index');
//var profile = require('./routes/profile');
//var search = require('./routes/search');
//var download = require('./routes/download');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Register '.mustache' extension with The Mustache Express
//app.engine('mustache', mustacheExpress());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'mustache');

// app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main.hbs'}));
// app.set('view engine', 'hbs');




//Ref : https://github.com/ericf/express-handlebars/blob/master/examples/advanced/server.js
// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
    extname      :'hbs',
    defaultLayout: 'main',
    //TODO: helpers      : helpers,

    // Uses multiple partials dirs, templates in "shared/templates/" are shared
    // with the client-side of the app (see below).
    partialsDir: [
        'shared/templates/',
        'views/partials/'
    ]
});

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


/*/Ref later : https://github.com/ericf/express-handlebars/blob/master/examples/advanced/server.js
// Middleware to expose the app's shared templates to the cliet-side of the app
// for pages which need them.
function exposeTemplates(req, res, next) {
    // Uses the `ExpressHandlebars` instance to get the get the **precompiled**
    // templates which will be shared with the client-side of the app.
    hbs.getTemplates('shared/templates/', {
        cache      : app.enabled('view cache'),
        precompiled: true
    }).then(function (templates) {
        // RegExp to remove the ".handlebars" extension from the template names.
        var extRegex = new RegExp(hbs.extname + '$');

        // Creates an array of templates which are exposed via
        // `res.locals.templates`.
        templates = Object.keys(templates).map(function (name) {
            return {
                name    : name.replace(extRegex, ''),
                template: templates[name]
            };
        });

        // Exposes the templates during view rendering.
        if (templates.length) {
            res.locals.templates = templates;
        }

        setImmediate(next);
    })
    .catch(next);
}

app.get('/echo/:message?', exposeTemplates, function (req, res) {
    res.render('echo', {
        title  : 'Echo',
        message: req.params.message,

        // Overrides which layout to use, instead of the defaul "main" layout.
        layout: 'shared-templates'
    });
});
*/




// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Make our db accessible to our router
// app.use(function(req,res,next){
//     next();
// });

app.use('/', routes);
app.use('/cp', routes);
//app.use('/profile', profile);
//app.use('/search', search);
//app.use('/download', download);

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
