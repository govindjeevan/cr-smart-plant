var mongoose = require('mongoose');
var Settings = require('./settingsData');

// Variables
var connectedSensors;
var soilMeasureIntervall;
var soilFollowUpIntervall;
var nightEnable;
var nightStartTime;
var nightStopTime;


// Read settings from database
function readSettings() {
	
	Settings.findOne({}, function(err, settings) {	
		if (err) {
			console.log(err);
			return;
		}

		connectedSensors = settings.connectedSensors;
		soilMeasureIntervall = settings.soilMeasureIntervall;
		soilFollowUpIntervall = settings.soilFollowUpIntervall;
		nightEnable = settings.night.enable;
		nightStartTime = settings.night.startTime;
		nightStopTime = settings.night.stopTime;
	});

}


// Export module
module.exports = {
	
	readSettings: function() {
		readSettings();
	},
	
	connectedSensors: function() {
		return connectedSensors
	},
	
	soilMeasureIntervall: function() {
		return soilMeasureIntervall
	},
	
	soilFollowUpIntervall: function() {
		return soilFollowUpIntervall
	},
	
	nightEnable: function() {
		return nightEnable
	},
	
	nightStartTime: function() {
		return nightStartTime
	},
	
	nightStopTime: function() {
		return nightStopTime
	}	
};