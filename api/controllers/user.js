const User = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv/config');

exports.signup_user = (req, res, next) => {
	bcrypt
		.hash(req.body.password, 10)
		.then(result => {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				DeptID:req.body.DeptID,
				govern_level:req.body.govern_level,
				public_Address: req.body.public_Address,	
				password: result,
			});

			user.save()
				.then(result => {
					res.status(201).json({
						message: 'User Registered Successfully',
						response: result,
					});
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({
						message: 'Error in signup',
						response: err,
					});
				});
		})
		.catch(err => {
			res.status(500).json({
				message: err,
			});
		});
};

exports.user_login = (req, res, next) => {
	
	console.log(req.body);
	User.find({ email: req.body.email })
		.exec()
		.then(result => {
			if (result.length < 1) {
				res.status(401).json({
					message: 'Auth failed',
				});
			}
			bcrypt.compare(req.body.password, result[0].password, (error, resolve) => {
				if (resolve) {
					jwt.sign(
						{
							email: result[0].email,
							userId: result[0]._id,
						},
						process.env.JWT_PRIVATEKEY,
						{
							expiresIn: '1h',
						},
						(err, token) => {
							if (err) {
								res.status(401).json({
									message: 'Auth UnSuccessful',
									error: err,
								});
							} else {
								res.status(200).json({
									message: 'Auth Successful',
									type: result[0].govern_level,
									Token: token,
								});
							}
						}
					);
				} else {
					res.status(401).json({
						message: 'Auth failed',
					});
				}
			});
		})
		.catch(err => {});
};
