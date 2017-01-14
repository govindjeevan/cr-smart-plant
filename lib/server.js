var rpio = require('rpio');
var config = require('./config');
var settings = require('./settings');
var soil = require('./soil');

// Variables
var lastMin;

// Initiate app by read settings and open GPIO
module.exports.init = function init() {

	// Read settings
	settings.readSettings();

	// Declare GPIO outputs
	rpio.open(config.gpio.Solenoid[1], rpio.OUTPUT);
	rpio.open(config.gpio.Solenoid[2], rpio.OUTPUT);
	rpio.open(config.gpio.Solenoid[3], rpio.OUTPUT);
	rpio.open(config.gpio.Solenoid[4], rpio.OUTPUT);
	rpio.open(config.gpio.SoilSensor, rpio.OUTPUT);
	rpio.open(config.gpio.Pump, rpio.OUTPUT);
	rpio.open(config.gpio.Lamp, rpio.OUTPUT);
}


// Main loop
module.exports.main = function main() {

	// Get current date
	var dt = new Date();

	// New minute
	if (lastMin != dt.getMinutes()) {
		lastMin = dt.getMinutes();
		
		// Run every hour
		if (lastMin == 0) {
			
			soil.measureSoil();	// Measure soil moisture
		}
	}
}