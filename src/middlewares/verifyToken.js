const jwt = require('jsonwebtoken')
const {userNew} = require('../models')

const verifyToken = async (req, res, next) => {
	try {
		const jwtToken = req.headers['authorization']

		if (!jwtToken) {
			return res.status(400).send({
				message: 'no token provided'
			})
		}

		const verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_SECRET)

		if (!verify) {
			return res.status(403).send({
				message: `failed to authenticate token. forbidden to access`
			})
		}

		req.user = verify

		next()
	} catch (error) {
		return res.send({
			message: `error`,
			data: error
		})
	}
}
module.exports = {verifyToken}