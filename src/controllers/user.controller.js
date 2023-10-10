const knex = require('../knexmodel/knex')

const CreateUser = async (req, res) => {
	try {
		const body = req.body

		const insertData = await knex('users').insert({
			firstname: body.firstname,
			lastname: body.lastname,
			email: body.email,
			username: body.username,
			password: body.password
		})

		return res.status(201).send('sukses boi')
	} catch (error) {
		console.log(error)
		return res.status(500).send('internal server error')
	}
}

module.exports= {CreateUser}