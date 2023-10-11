require('dotenv').config();
const express = require('express')
const PORT = process.env.SERVER_PORT || '4646'
const cors = require('cors')
const {sequelize} = require('./models')

const ProductRoute = require('./routes/product_route')
const UserRoute = require('./routes/user_route')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({origin: true}))

sequelize.authenticate().then((error) => {
	console.log('database connection has been established successfully')
}).catch((error) => {
	console.log('connection error', error)
})

app.get('/', (req, res) => {
	res.send('Hello Mother Father')
})

app.use('/api/product', ProductRoute)
app.use('/api/user', UserRoute)

app.listen(PORT, ()=> {console.log('The server is running on ' + PORT)})