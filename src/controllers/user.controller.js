const knexQuery = require('../modelknex/knex')
const {userNew} = require('../models')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const create = async (req, res) => {
	try {
		const {nama_depan, nama_belakang, username, email, password} = req.body

		// const insertData = await knexQuery('users').insert({
		// 	firstName: body.nama_depan,
		// 	lastName: body.nama_belakang,
		// 	email: body.email,
		// 	password: body.password
		// })

		if (!nama_depan || !email || !password || !username) {
			return res.status(400).send({
				message: `some field must be filled, cannot be empty`
			})
		}

		const hashedPassword = bcrypt.hashSync(password, 8)

		const input = await userNew.create({
			firstname: nama_depan,
			lastname: nama_belakang,
			username: username,
			email: email,
			password: hashedPassword
		})

		return res.status(201).send({
			message: "user created"
		})
	} catch (error) {
		console.log(error)
		return res.send({
			message: 'error occured',
			data: error
		})
	}
}

const login = async (req, res) => {
	try {
		const {username, password} = req.body

		if (!password || !username) {
			return res.status(400).send({
				message: `some field must be filled, cannot be empty`
			})
		}

		const getUser = await userNew.findOne({
			where: {username: username}
		})

		if (!getUser) {
			return res.status(404).send({
				message: 'User ' + username + ' not found'
			})
		}

		const isValidPassword = bcrypt.compareSync(password, getUser.dataValues.password)

		if (!isValidPassword) {
			return res.status(400).send({
				message: 'Invalid Password'
			})
		}

		const token = jwt.sign({
			id: getUser.dataValues.id,
			username: getUser.dataValues.username
		}, process.env.JWT_SECRET, {expiresIn: 3600})

		return res.status(200).send({
			message: 'login success',
			token: token
		})

	} catch (error) {
		console.log(error)
		return res.send({
			message: 'error occured',
			data: error
		})
	}
}

module.exports = {create, login}