const Scheme = require('../models/scheme');
const mongoose = require('mongoose');

exports.get_scheme_by_deptno = (req, res, next) => {
	rn = req.params.deptNo;
	Scheme.find({ DeptID: rn })
		.exec()
		.then(result => {
			console.log(result);
			if (result.length != 0) {
				res.status(200).json({
					message: result,
				});
			} else {
				res.status(404).json({
					message: 'No Scheme',
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

exports.add_scheme = (req, res, next) => {
	const scheme = new Scheme({
		_id: mongoose.Types.ObjectId(),
		name: req.body.name,
		schemeID: req.body.schemeID,
		DeptID: req.body.DeptID,
		description: req.body.description,
	});
	scheme
		.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				message: 'Scheme Added',
				response: result,
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: 'I am in error',
				response: err,
			});
		});
};
