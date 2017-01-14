var mongoose = require('mongoose');
var express = require('express');
var Plants = require('./plantData');
var spi = require('./spi');

// Variables
var router = express.Router();

// Get all
router.get('/plants', function(req, res) {
	
	Plants.find({}, null, { sort: { connection: 'asc'} }, function(err, plants) {
		if (err)
			res.send(err);
			
		res.json({ plants: plants });
	});
});


// Get single
router.get('/plants/:PlantId', function(req, res) {
	
	Plants.findById(req.params.PlantId, function(err, plants) {	
		if (err)
			res.send(err);
		else if (plants.length < 1)
			res.status(204).send({ error: 'No Content' })
		else
			res.json({ plants: plants });
	});
});


// Add new post
router.post('/plants/', function(req, res) {
	
	var plant = Plants({
		name: req.body.name,
		type: req.body.type,
		desc: req.body.desc,
		moisture: {
			lowLevel: req.body.moistureLowLevel,
			highLevel: req.body.moistureHighLevel,
			lowAlarm: req.body.moistureLowAlarm,
			highAlarm: req.body.moistureHighAlarm,
			PV: 0,
			date: '2000-01-01'
		},
		connection: req.body.connection,
		plantedDate: req.body.plantedDate,
		enabled: req.body.enabled,
		sensorCalibration: req.body.sensorCalibration
	  
	});
	
	plant.save(function(err) {
		if (err)
			res.send(err);
	
		res.json({ message: 'Plant created!', plants: plant });
	});
});


// Update post
router.put('/plants/:PlantId', function(req, res) {
		
	Plants.findById(req.params.PlantId, function(err, plant) {	
		if (err)
			res.send(err);

		if (req.body.name != undefined) {
			plant.name = req.body.name;
		}
		
		if (req.body.type != undefined) {
			plant.type = req.body.type;
		}
		
		if (req.body.desc != undefined) {
			plant.desc = req.body.desc;
		}
		
		if (req.body.moistureLowLevel != undefined) {
			plant.moisture.lowLevel = req.body.moistureLowLevel;
		}
		
		if (req.body.moistureHighLevel != undefined) {
			plant.moisture.highLevel = req.body.moistureHighLevel;
		}
		
		if (req.body.moistureLowAlarm != undefined) {
			plant.moisture.lowAlarm = req.body.moistureLowAlarm;
		}
		
		if (req.body.moistureHighAlarm != undefined) {
			plant.moisture.highAlarm = req.body.moistureHighAlarm;
		}
		
		if (req.body.moisturePV != undefined) {
			plant.moisture.PV = req.body.moisturePV;
		}
		
		if (req.body.moistureDate != undefined) {
			plant.moisture.date = req.body.moistureDate;
		}
		
		if (req.body.connection != undefined) {
			plant.connection = req.body.connection;
		}
		
		if (req.body.plantedDate != undefined) {
			plant.plantedDate = req.body.plantedDate;
		}
	
		if (req.body.enabled != undefined) {
			plant.enabled = req.body.enabled;
		}
		
		if (req.body.sensorCalibration != undefined) {
			plant.sensorCalibration = req.body.sensorCalibration;
		}
		

		plant.save(function(err) {
			if (err)
				res.send(err);
		
			res.json({ message: 'Plant updated!', plants: plant });
		});
	});
});


// Delete post
router.delete('/plants/:PlantId', function(req, res) {
	
    Plants.remove({ _id: req.params.PlantId }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({ message: 'Plant successfully deleted!' });
    });
});


// Measure single plant
router.get('/plants/measure/:PlantId', function(req, res) {
	
	Plants.findById(req.params.PlantId, function(err, post) {	
		if (err)
			res.send(err);
		else if (post.length < 1)
			res.status(204).send({ error: 'No Content' })
		else {
			
			var value = spi.getValue(post.connection)
			
			post.moisture.PV = parseInt(value / post.sensorCalibration * 100);
			post.moisture.date = new Date();

			post.save(function(err) {
				if (err)
					res.send(err);
			
				res.json({ message: 'Plant measured!', plants: post, PVRaw: value });
			});
		}
	});
});


// Export router
module.exports = router;