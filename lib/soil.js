
var spi = require('./spi');
var watering = require('./watering');
var Plant = require('./plantData');
var Trend = require('./trendData');

// Measure all soil sensors and save last measured value to db
module.exports.measureSoil = function measureSoil() {
	
	var dt = new Date();
	
	// Get plants
	Plant.find({}, null, { sort: { connection: 'asc'} }, function(err, plants) {
		if (err) {
			console.log(err);
			return;		
		}
	
		// Loop plants
		plants.forEach(function(plant) {

			// Update moisture value
			var value = parseInt(spi.getValue(plant.connection) / plant.sensorCalibration * 100) || 0;
			
			plant.moisture.PV = value;
			plant.moisture.date = dt;

			// Save post in database
			plant.save(function(err) {
				if (err) {
					console.log(err);
				}
			});

			// Trend logging
			module.exports.trendSoil(plant.connection, value);
			
			// Start watering if the soil is too dry
			if (plant.moisture.PV < plant.moisture.lowLevel && plant.enabled) {
				watering.wateringSoil(plant.connection, plant.pumpTime);
			}
		});
	});
}


// Save measured soil to db for trend logging
module.exports.trendSoil = function trendSoil(connection, value) {
	
	// Return if connection not exists
	if (connection < 1 || connection > 4 || value <= 0) {
		return;
	}
	
	// New trend
	var trend = Trend({
		connection: connection,
		date: new Date(),
		value: value,
		unit: '%'
	});
	
	// Save to db
	trend.save(function(err) {
		if (err) {
			console.log(err);
			return;
		}
	});
}