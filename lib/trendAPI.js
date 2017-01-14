var mongoose = require('mongoose');
var express = require('express');
var Trends = require('./trendData');

// Variables
var router = express.Router();

// Get all
router.get('/trends', function(req, res) {
	
	Trends.find({}, function(err, posts) {	
		if (err)
			res.send(err);
			
		res.json({ trends: posts });
	});
});


// Get single by connection
router.get('/trends/:ConnectionId', function(req, res) {
	
	Trends.find({ 'connection' : req.params.ConnectionId }, function(err, posts) {	
		if (err)
			res.send(err);
		else if (posts.length < 1)
			res.status(204).send({ error: 'No Content' })
		else
			res.json({ trends: posts });
	});
});


// Export router
module.exports = router;