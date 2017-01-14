var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema({
	connectedSensors: Number,
	soilMeasureIntervall: Number,
	soilFollowUpIntervall: Number,
	night: {
		enable: Boolean,
		startTime: Date,
		stopTime: Date
	}
});

// Export model
module.exports = mongoose.model('Settings', schema);
