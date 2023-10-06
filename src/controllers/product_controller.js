const productData = require('../models/MOCK_DATA.json')

const GetAllData = (req, res) => {
	const result = productData || null

	if (!result) return res.send({error: 'Data not found'})

	res.json({data: result})
}

const GetDataById = (req, res) => {
	const id = req.params.idloe

	const result = productData[id]

	if (!result) return res.send({error: 'Data not found'})

	res.json({data: result})
}

module.exports = {GetAllData, GetDataById}