var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema({
	name: String,
	type: String,
	desc: String,
	moisture: {
		lowLevel: Number,
		highLevel: Number,
		lowAlarm: Number,
		highAlarm: Number,
		PV: Number,
		date: Date
	},
	pumpTime: { type: Number, defaults: 1000 },
	connection: Number,
	plantedDate: Date,
	enabled: Boolean,
	sensorCalibration: Number
});

// Export model
module.exports = mongoose.model('Plant', schema);
