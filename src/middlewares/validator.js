const validator = require('validator')
const crypt = require('bcrypt')
const {user} = require('../models')


const ValidateCreateUser = async (req, res, next) => {
	try {
		const {firstname, lastname, email, username, password} = req.body

		if (!firstname || !lastname || !email || !username || !password) {
			return res.status(400).send({
				message: 'some field is missing'
			})
		}

		const strongPassword = validator.isStrongPassword(password)
		if (!strongPassword) return res.status(400).send({message: 'password not strong'})

		const isValidEmail = validator.isEmail(email, {host_blacklist: ['yopmail.com', 'yahoo.com']})
		if (!isValidEmail) return res.status(400).send({message: 'your email is invalid'})

		next()
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error at validator')
	}
}

const ValidateLogin = async (req, res, next) => {
	try {
		const {username, password} = req.body
		if (!username || !password) {
			return res.status(400).send({
				message: 'username and password is required'
			})
		}

		const getUser = await user.findOne({where: {username: username}})
		if (!user) {
			return res.status(404).send({
				message: 'user not found'
			})
		}

		const isValidPassword = crypt.compareSync(password, getUser.dataValues.password)
		if (!isValidPassword) {
			return res.status(400).send({
				message: 'invalid password'
			})
		}

		req.userData = getUser.dataValues
		next()
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error at validator')
	}
}

module.exports = {ValidateCreateUser, ValidateLogin}