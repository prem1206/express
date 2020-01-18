const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors=require('cors');

require('dotenv/config');
app.use(cors());
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


const UserRoute = require('./api/routes/user');

app.use('/user', UserRoute);
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
