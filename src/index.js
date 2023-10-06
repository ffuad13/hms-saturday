require('dotenv').config();
const express = require('express')
const PORT = process.env.SERVER_PORT || '4646'

const ProductRoute = require('./routes/product_route')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello Mother Father')
})

app.use('/api/product', ProductRoute)

app.listen(PORT, ()=> {console.log('The server is running on ' + PORT)})