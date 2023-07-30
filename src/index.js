require("dotenv").config();
const express = require("express");
const cors = require('cors')
const PORT = process.env.SERVER_PORT || 3000;
const {sequelize} = require('./models')

const productRouter = require('./routes/product.route')
const userRouter = require('./routes/user.route')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: true, credentials: true}))

sequelize.authenticate().then(function(error) {
	console.log(`Database Connection has been established successfully`)
}).catch(function(error) {
	console.log('unable connect to database', error)
})

app.get("/home", (req, res) => {
	res.send({Name: 'myProductApi', version: '1.0.23', author: 'Faizul'})
})

app.use("/api/products", productRouter)
app.use("/api/user", userRouter)

app.listen(PORT, () => {
	console.log('Server is running on ' + PORT)
})