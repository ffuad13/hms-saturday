const jwt = require('jsonwebtoken')
const {user1} = require('../models')

exports.verifyToken = async (req, res, next) => {
	try {
		const jwtToken = req.headers['authorization']

		if (!jwtToken) {
			return res.status(400).send({
				message: 'no jwt token provided'
			})
		}

		const verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_KEY)
		if (!verify) {
			return res.status(403).send({
				message: 'failed to authenticate JWT Token'
			})
		}

		req.user = verify
		next()
	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: error
		})
	}
}

exports.verifyAdmin = async (req, res, next) => {
	try {
		const getData = await user1.findOne({
			where: req.user.id
		})

		if (getData.dataValues.roles !== 'admin') {
			return res.status(403).send({
				message: 'You not authorized, this endpoint is for admin'
			})
		}

		next()
	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: error
		})
	}
}