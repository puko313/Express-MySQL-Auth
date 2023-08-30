const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET_KEY } = require('../utils/secrets');
const SUPER_ADMIN_ROLE = 2;
const ADMIN_ROLE = 1;
const USER_ROLE = 0;

/**
 * Route authentication middleware to verify a token
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 */

const isAuthenticated = (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(StatusCodes.UNAUTHORIZED).json({ error: 'You are not authorized to perform this operation!' });
			} else {
				User.findById(decoded.id, (err, data) => {
					if (err) {
						if (err.kind === "not_found") {
							res.status(StatusCodes.UNAUTHORIZED).json({ error: 'You are not authorized to perform this operation!' });
							return;
						}
						res.status(500).send({
							status: 'error',
							message: err.message
						});
						return;
					}
					if (data) {
						next();
					}
				})
			}
		});
	} else {
		res.status(StatusCodes.FORBIDDEN).json({
			error: 'No token provided'
		});
	}
};
const isAdmin = (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;

	if (authorizationHeader) {
		token = authorizationHeader.split(' ')[1];
	}

	if (token) {
		jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(StatusCodes.UNAUTHORIZED).json({ error: 'You are not authorized to perform this operation!' });
			} else {
				User.findById(decoded.id, (err, data) => {
					if (err) {
						if (err.kind === "not_found") {
							res.status(StatusCodes.UNAUTHORIZED).json({ error: 'You are not authorized to perform this operation!' });
							return;
						}
						res.status(500).send({
							status: 'error',
							message: err.message
						});
						return;
					}
					if (data) {
						if (data.id < ADMIN_ROLE) {
							res.status(StatusCodes.UNAUTHORIZED).send({
								status: 'error',
								message: "You are not authorized to perform this operation!"
							});
							return;
						}
						next();
					}
				})
			}
		});
	} else {
		res.status(StatusCodes.FORBIDDEN).json({
			error: 'No token provided'
		});
	}
};

module.exports = {
	isAuthenticated,
	isAdmin
}