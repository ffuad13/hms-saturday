require("dotenv").config()

const jwt = require('jsonwebtoken')
const {user} = require('../models')

exports.verifyToken = (req, res, next) => {
	try {
		const jwtToken = req.headers['authorization']
		if (!jwtToken) {
			return res.status(403).send({
				message: 'no JWT token provided'
			})
		}

		let verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_SECRET)
		if (!verify) {
			return res.status(403).send({
				message: 'Failed to authenticate JWT TOKEN'
			})
		}

		req.user = verify
		next()
	} catch (error) {
		return res.status(500).send({
			error: error
		})
	}
}