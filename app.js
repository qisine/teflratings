var express = require('express')
  , http = require('http')
  , path = require('path')
  , auth = require('./auth')
  , routes = require('./routes')
  , models = require('./models') ;

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('JOaeu5y)P(%7oWV*04w0V$.be.,aW0:v>hw4uOao'));
app.use(express.session());
app.use(auth.everyauth.middleware());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(function(err, req, res, next) {
  var e = err || "An error occurred! :(";
  res.send({ error: e.toString() });
});

app.get('/', routes.schools.list);

app.get('/schools', routes.schools.list);
app.get('/schools/:id', routes.schools.show);
app.post('/schools', auth.authenticate, routes.schools.create);
app.put('/schools/:id', auth.authenticateAndAuthorize('School'), routes.schools.update);
app.delete('/schools/:id', auth.authenticateAndAuthorize('School'), routes.schools.destroy);

app.get('/reviews', routes.reviews.list);
app.get('/reviews/:id', routes.reviews.show);
app.post('/reviews', auth.authenticate, routes.reviews.create);
app.put('/reviews/:id', auth.authenticateAndAuthorize('review'), routes.reviews.update);
app.delete('/reviews/:id', auth.authenticateAndAuthorize('review'), routes.reviews.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
