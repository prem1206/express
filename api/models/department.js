const mongoose = require('mongoose');

const DeptSchema = mongoose.Schema({
	DeptID: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	Address: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Department', DeptSchema);
