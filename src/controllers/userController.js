const {user} = require('../models')

exports.getDetailUser = async (req, res) => {
	try {
		let getUser = await user.findOne({
			where: {id: req.user.id}
		})

		return res.status(200).send({
			message: 'retrieve success',
			data: getUser.dataValues
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

exports.updateUser = async (req, res,) => {
	try {
		const {firstname, lastname, username, email} = req.body

		let update = await user.update({
			firstname: firstname,
			lastname: lastname,
			username: username,
			email: email
		}, {
			where: {id: req.user.id}
		})

		let getUser = await user.findOne({
			where: {id: req.user.id}
		})

		return res.status(201).send({
			message: 'user updated',
			data: getUser.dataValues
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

exports.deleteUser = async (req, res) => {
	try {
		let deleted = user.destroy({
			where: {id: req.user.id}
		})

		return res.status(200).send({
			message: 'user deleted'
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

exports.getAllUser = async (req, res) => {
	try {
		let getUsers = await user.findAll()

		return res.status(200).send({
			message: 'retrieve success',
			data: getUsers
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