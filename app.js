var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , models = require('./models');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
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
app.post('/schools', routes.schools.create);
app.put('/schools/:id', routes.schools.update);
app.delete('/schools/:id', routes.schools.destroy);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
