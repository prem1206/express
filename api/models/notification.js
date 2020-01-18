const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	sender: {
		type: String,
		required: true,
        
	},
	receiver: {
		type: String,
		required: true,
		
	},
	amount: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,	
	},
	schemeID: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Notification', NotificationSchema);
