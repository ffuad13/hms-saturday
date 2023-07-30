const productData = require('../modelknex/MOCK_DATA.json')

const allProduct = (req, res) => {
	res.send({
		message: 'Data product retrieved',
		status: "OK",
		data: productData
	})
}

const productById = (req, res) => {
	const params = req.params.productId
	const intParams = parseInt(params)

	if (intParams >= 100 || intParams < 0) {
		return res.send({
			message: 'Data product not found',
			status: "Error",
			data: null
		})
	} else {
		return res.send({
			message: 'Data product retrieved',
			status: "OK",
			data: productData[intParams]
		})
	}

}

module.exports = {allProduct, productById}