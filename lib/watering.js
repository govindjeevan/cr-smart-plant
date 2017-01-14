var rpio = require('rpio');
var config = require('./config');
var settings = require('./settings');

// Watering soil
module.exports.wateringSoil = function wateringSoil(nPot, nPumpTime) {
	
	if (this.isNight()) {
		return;
	}
	
	// Start watering
	this.openSolenoid(nPot);
	setTimeout(this.closeSolenoid, nPumpTime, nPot);
}


// Start watering
module.exports.openSolenoid = function openSolenoid(nPot) {
	
	rpio.write(config.gpio.Solenoid[nPot], rpio.HIGH);	// Open solenoid
	rpio.write(config.gpio.Pump, rpio.HIGH); 			// Start pump	
}


// Stop watering
module.exports.closeSolenoid = function closeSolenoid(nPot) {
	
	rpio.write(config.gpio.Pump, rpio.LOW); 			// Stop pump
	rpio.write(config.gpio.Solenoid[nPot], rpio.LOW);	// Close solenoid
}


// Is night
module.exports.isNight = function isNight() {
	
	// Night mode isn't enabled in settings
	if (!settings.nightEnable())
		return false
		
	// Get timestamps
	var dt = new Date();
	var nightStart = settings.nightStartTime();
	var nightStop = settings.nightStopTime();
	
	// Set current date
	nightStart.setFullYear(dt.getFullYear());
	nightStart.setMonth(dt.getMonth());
	nightStart.setDate(dt.getDate());
	
	// Set current date
	nightStop.setFullYear(dt.getFullYear());
	nightStop.setMonth(dt.getMonth());
	nightStop.setDate(dt.getDate());
	
	// If time is over midnight
	if (nightStart.getHours() > nightStop.getHours()) {
	
		if (dt.getHours() > nightStop.getHours() || (dt.getHours() == nightStop.getHours() && dt.getMinutes() >= nightStop.getMinutes())) {
			nightStop.setDate(dt.getDate() + 1);	// Increase one day to nightstop
		} else if (dt.getHours() < nightStop.getHours() || (dt.getHours() == nightStop.getHours() && dt.getMinutes() <= nightStop.getMinutes())) {
			nightStart.setDate(dt.getDate() - 1);	// Decrease one day to nightstart
		}
		
	}
	
	// Return if it's night
	if (dt >= nightStart && dt <= nightStop) {
		return true;
	}
	
	return false;
}