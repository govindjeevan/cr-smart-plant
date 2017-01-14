var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

// Modules
var Plants = require('./plantAPI');
var Settings = require('./settingsAPI');
var Trends = require('./trendAPI');

// Configure app
var app	 = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure port
var port = process.env.PORT || 8080;

// Routes for API
var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to CR Smart Plant!' });
});

// Create routes for modules
app.use('/api', Plants);
app.use('/api', Settings);
app.use('/api', Trends);

// Start server
app.listen(port);
console.log('Starting API on port', port);

// Export for testing
module.exports = app;