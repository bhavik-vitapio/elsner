/**
 * Main application routes
 */

'use strict';

/**
 * Main application file
 */

'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

let express = require('express');
let http = require('http');
let compression = require('compression');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
let passport = require('passport');
let mongoose = require('mongoose');

// leting data models
let House = require('./api/models/house/house.model');
let Person = require('./api/models/person/person.model');
	

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/repairly-test', {
  db: {
    safe: true
  }
});

mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Setup server
var app = express();

var server = http.createServer(app);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/houses', require('./api/models/house')(House));
app.use('/api/persons', require('./api/models/person')(Person));



// Start server
function startServer() {
  app.angularFullstack = server.listen(9000, function() {
    console.log('Express server listening on %d, in %s mode', 9000, app.get('env'));
  });
}

setImmediate(startServer);  
