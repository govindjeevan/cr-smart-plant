var mongoose = require('mongoose');
var server = require('./lib/server');

var db = process.env.DB || 'cr-smart-plant';

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/' + db);

// Start app
if(process.env.NODE_ENV !== 'test') {
	
	console.log('Starting CR Smart Plant...')
	
	server.init();
	setInterval(server.main, 10000);
	
	// Start API
	require('./lib/api');
}