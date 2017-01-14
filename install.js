var mongoose = require('mongoose');
var Settings = require('./lib/settingsData');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cr-smart-plant');

// Create settings efter install
Settings.count({}, function(err, count){
	
	if (err) {
		console.log(err);
		process.exit();
	}
	
	if (count == 0) {
		
		var settings = Settings({
			connectedSensors: 0,
			soilMeasureIntervall: 60000,
			soilFollowUpIntervall: 50000,
			night: {
				enable: false,
				startTime: '2000-01-01 00:00:00',
				stopTime: '2000-01-01 00:00:00'
			}
		});
		
		settings.save(function(err) {
			if (err) {
				console.log(err);
			}
			
			process.exit();
		});
	} else {
		process.exit();
	}
});