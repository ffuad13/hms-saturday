const JWT = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
	try {
		const token = req.headers['authorization']
		if (!token) return res.status(400).send({message: 'no token provided / token empty'})

		const verify = JWT.verify(token.split(" ")[1], process.env.JWT_SECRET)
		if (!verify) return res.status(401).send({message: 'failed to verify token'})

		req.userID = verify

		next()
	} catch (error) {
		console.log(error)
		return res.status(500).send({
			message: 'error internal',
			data: error.message
		})
	}
}

module.exports = {verifyJWT}