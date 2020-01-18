const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => {
		console.log('connected');
	})
	.catch(err => {
		console.log(err);
	});


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', '*');
		return res.status(200).json({});
	}
	next();
});

const schemesRoute = require('./api/routes/schemes');
const UserRoute = require('./api/routes/user');
const DepartmentRoute = require('./api/routes/department');

app.use('/schemes', schemesRoute);
app.use('/user', UserRoute);
app.use('/department',DepartmentRoute);
app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});



app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});
module.exports = app;
