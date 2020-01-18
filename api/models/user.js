const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	firstname: {
		type: String,
		required: true,
	},
	lastname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone: {
		type: Number,
		required: true,
		unique: true,
		
	},
	govt: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', UserSchema);
