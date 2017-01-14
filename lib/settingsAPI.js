var mongoose = require('mongoose');
var express = require('express');
var Settings = require('./settingsData');
var settings = require('./settings');

// Variables
var router = express.Router();

// Get all
router.get('/settings', function(req, res) {
	
	Settings.findOne({}, function(err, posts) {	
		if (err)
			res.send(err);
			
		res.json({ settings: posts });
	});
});


// Update post
router.put('/settings', function(req, res) {
		
	Settings.findOne({}, function(err, post) {	
		if (err)
			res.send(err);


		if (req.body.connectedSensors != undefined) {
			post.connectedSensors = req.body.connectedSensors;
		}
		
		if (req.body.soilMeasureIntervall != undefined) {
			post.soilMeasureIntervall = req.body.soilMeasureIntervall;
		}
		
		if (req.body.soilFollowUpIntervall != undefined) {
			post.soilFollowUpIntervall = req.body.soilFollowUpIntervall;
		}
		
		if (req.body.nightEnable != undefined) {
			post.night.enable = req.body.nightEnable;
		}
		
		if (req.body.nightStartTime != undefined) {
			post.night.startTime = req.body.nightStartTime;
		}
		
		if (req.body.nightStopTime != undefined) {
			post.night.stopTime = req.body.nightStopTime;
		}
		

		post.save(function(err) {
			if (err)
				res.send(err);
		
			res.json({ message: 'Settings updated!', settings: post });
			
			settings.readSettings();
		});
	});
});


// Export router
module.exports = router;