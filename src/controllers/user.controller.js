const knex = require('../knexmodel/knex')
const {user} = require('../models')
const validator = require('validator')
const crypt = require('bcrypt')
const e = require('cors')

const CreateUser = async (req, res) => {
	try {
		const {firstname, lastname, email, username, password} = req.body
		/* const insertData = await knex('users').insert({
			firstname: body.firstname,
			lastname: body.lastname,
			email: body.email,
			username: body.username,
			password: body.password
		}) */
		if (!firstname || !lastname || !email || !username || !password) {
			return res.status(400).send({
				message: 'some field is missing'
			})
		}

		const strongPassword = validator.isStrongPassword(password)
		if (!strongPassword) return res.status(400).send({message: 'password not strong'})

		const hashedPwd = crypt.hashSync(password, 8)

		const insert = await user.create({
			firstname: firstname,
			lastname: lastname,
			email: email,
			username: username,
			password: hashedPwd
		})

		return res.status(201).send({message: 'create user success'})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

const GetUsers = async (req, res) => {
	try {
		const allUsers = await knex.select().from('users')

		return res.status(200).send({
			message: 'sukses get data',
			allUsers
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

const UpdateUser = async (req, res) => {
	try {
		const body = req.body

		const updated = await knex('users')
		.where({username: body.username}).update({firstname: body.firstname})

		return res.status(201).send({
			message: 'update success'
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

const DeleteUser = async (req, res) => {
	try {
		const body = req.body

		const deleted = await knex('users').where({id: body.id}).del()

		if (!deleted) return res.status(404).send({message: 'data not found, delete failed'})

		return res.status(200).send({message: 'delete success'})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

const Login = async (req, res) => {
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
			return res.status(404).send({
				message: 'invalid password'
			})
		}

		return res.status(200).send({message: 'login success'})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

module.exports= {CreateUser, GetUsers, UpdateUser, DeleteUser, Login}