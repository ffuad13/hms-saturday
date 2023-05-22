const knexQuery = require('../model/knex')
const jwt = require('jsonwebtoken')
const crypt = require('bcryptjs')
const {user1} = require('../models')

exports.register = async (req, res, next) => {
	try {
		const {firstname, lastname, username, email, password} = req.body
		const hashedPassword = crypt.hashSync(password, 8)

		const input = await user1.create({
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email,
			password: hashedPassword
		})


		/* const input = await knexQuery('users').insert({
			firsname: body.nama_depan,
			lastname: body.nama_belakang,
			email: body.email,
			password: body.password
		}) */

		return res.status(201).send({
			mesaage: 'Register succes'
		})
	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: 'check log'
		})
	}
}

exports.getUser = async(req, res, next) => {
	try {
		const idUser = req.params.id
		const getDataUser = await knexQuery('users').where({
			id: idUser
		}).select('*')

		if (getDataUser == false) {
			return res.status(404).send({
				mesaage: 'get user failed',
				data: getDataUser
			})
		}

		return res.status(200).send({
			mesaage: 'get user success',
			data: getDataUser
		})
	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: error
		})
	}
}

exports.user = async (req, res, next) => {
	try {
		const getAllUser = await user1.findAll()

		return res.status(200).send({
			message: 'get all user success',
			data: getAllUser
		})

	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: error
		})
	}
};

exports.login = async (req, res, next) => {
	try {
		const {username, password} = req.body

		const getData = await user1.findOne({
			where: {username: username}
		})

		if (!getData) {
			return res.status(404).send({
				message: 'Login Failed, user not found'
			})
		}

		const isPasswordValid = crypt.compareSync(password, getData.dataValues.password)
		if (!isPasswordValid) {
			return res.status(400).send({
				message: 'Login Failed, Wrong Password'
			})
		}

		const token = jwt.sign({
			id: getData.dataValues.id,
			uname: getData.dataValues.username,
			email: getData.dataValues.email
		}, process.env.JWT_KEY, {expiresIn: 3600})

		return res.send({
			message: 'sukses login',
			username: getData.dataValues.username,
			token: token
		})
	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: error
		})
	}
}

exports.getMe = async (req, res, next) => {
	try {
		const user = req.user

		const getData = await user1.findOne({
			where: {email: user.email}
		})

		if (!getData) {
			return res.status(404).send({
				message: 'user not found'
			})
		}

		return res.status(200).send({
			message: 'get my profile success',
			data: getData.dataValues
		})
	} catch (error) {
		res.status(500).send({
			message: `an error occured`,
			data: error
		})
	}
}