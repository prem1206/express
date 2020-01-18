const Notification = require('../models/notification');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.get_notification = (req, res, next) => {
    const receiver = req.params.receiverID;
	Notification.find({ receiver: receiver })
		.exec()
		.then(result => {
			
			if (result.length != 0) {
				res.status(200).json({
					message: result,
				});
			} else {
				res.status(404).json({
					message: 'No Notification',
				});
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: err,
			});
		});
};

exports.send_notification = (req, res, next) => {
    console.log("hello");
	const notification = new Notification({
		_id: new mongoose.Types.ObjectId(),
		sender: req.body.sender,
		receiver: req.body.receiver,
		amount: req.body.amount,
		time: req.body.time,
		schemeID: req.body.schemeID,
	});

	notification
		.save()
		.then(result => {
			res.status(201).json({
				message: 'Notification send Successfully',
				response: result,
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'Error in sending notification',
				response: err,
			});
		});
};
