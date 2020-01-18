const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, process.env.JWT_PRIVATEKEY, (err, decoded) => {
		if (err) {
			res.status(401).json({
				message: 'Auth Required',
				error: err,
			});
		} else {
			req.userdata = decoded;
			next();
		}
	});
};
