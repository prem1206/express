const mongoose = require('mongoose');

const SchemeSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true,
	},
	schemeID: {
		type: String,
		required: true,
		unique: true,
	},
	DeptID: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Scheme', SchemeSchema);
