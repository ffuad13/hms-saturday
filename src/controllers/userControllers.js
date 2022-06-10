const knex = require('../models/knex')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
	try {
		const {firstName, lastName, username, email, password} = req.body

		if (firstName && lastName && username && email && password === "") {
			return res.status(400).send({
				message: 'field should not be empty'
			})
		}

		const hashedPassword = bcrypt.hashSync(password, 8)

		let insertData = await knex('users').insert({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: hashedPassword
		}).then(insertedId => {
			return insertedId
		})

		const token = jwt.sign({
			id: insertData[0]
		}, process.env.JWT_KEY, {expiresIn: 3600})

		return res.status(201).send({
			message: 'register success',
			data: insertData,
			token: token
		})
	} catch (error) {
		res.status(500).send({
			code: 500,
      status: false,
      message: error.message,
      data: null
		})
	}
}

exports.login = async (req, res) => {
	try {
		let getData = await knex('users').where({
			username: req.body.username
		}).select('*')

		const isPasswordValid = bcrypt.compareSync(req.body.password, getData[0].password)

		if (!isPasswordValid) {
			return res.status(400).send({
				message: 'pasword invalid'
			})
		}

		const token = jwt.sign({
			id: getData[0].id
		}, process.env.JWT_KEY, {expiresIn: 3600})

		return res.status(200).send({
			message: 'login succesfull',
			data: getData,
			token: token
		})
	} catch (error) {
		res.status(500).send({
			code: 500,
      status: false,
      message: error.message,
      data: null
		})
	}
}