require("dotenv").config()

const jwt = require('jsonwebtoken')
const {user} = require('../models')

exports.verifyToken = async (req, res, next) => {
	try {
		const jwtToken = req.headers['authorization']
		if (!jwtToken) {
			return res.status(403).send({
				message: 'no JWT token provided'
			})
		}

		let verify = jwt.verify(jwtToken.split(" ")[1], process.env.JWT_KEY)
		if (!verify) {
			return res.status(403).send({
				message: 'Failed to authenticate JWT TOKEN'
			})
		}

		req.user = verify
		next()
	} catch (error) {
		res.status(500).send({
			code: 500,
      status: false,
      message: error.message,
      data: null
		})
	}
}

exports.verifyAdmin = async (req, res, next) => {
	let isAdmin = await user.findOne({
		where: {id: req.user.id}
	})

	if (isAdmin.dataValues.role !== 'admin') {
		return res.status(403).send({
			message: 'Forbidden, you are not admin'
		})
	}

	next()
}

exports.userUpdateDeleteAuthorize = async (req,res,next) => {
	if (req.params.id != req.user.id) {
		return res.status(403).send({
			message: 'Forbidden, you cannot update or delete another user account'
		})
	}

	next()
}