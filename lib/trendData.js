var mongoose = require('mongoose');

// Schema
var schema = new mongoose.Schema({
	connection: Number,
	date: Date,
	value: Number,
	unit: String
});

// Export model
module.exports = mongoose.model('Trend', schema);
