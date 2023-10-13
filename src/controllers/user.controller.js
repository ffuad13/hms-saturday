const knex = require('../knexmodel/knex')
const {user} = require('../models')
const validator = require('validator')
const crypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { where } = require('sequelize')
const { use } = require('../routes/user_route')

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
		const {userData} = req
		delete userData.password

		const token = JWT.sign({id: userData.id}, process.env.JWT_SECRET, {expiresIn: 3600})


		return res.status(200).send({
			message: 'login success',
			token: token,
			userData
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

const GetProfile = async (req, res) => {
	try {
		const {userID} = req

		const getData = await user.findOne({where: {id: userID.id}})
		if (!getData) return res.status(404).send({message: 'data not found'})

		return res.status(200).send({
			message: 'get profile success',
			data: getData.dataValues
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

const UploadPic = async (req, res) => {
	try {
		const {userID} = req
		console.log(userID)
		const filename = req.file.filename
		const path = req.file.path

		const upload = await user.update({profilepict: path}, {where:{id: userID.id}})

		return res.status(201).send({
			message: "upload success",
			data: upload
		})
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

module.exports= {CreateUser, GetUsers, UpdateUser, DeleteUser, Login, GetProfile, UploadPic}