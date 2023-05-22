require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')

const router = require('./routes/router');
const userRouter = require('./routes/userRouter')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

sequelize.authenticate().then(function(error) {
	console.log(`Database Connection has been established successfully`)
}).catch(function(error) {
	console.log('unable connect to database', error)
})

app.use('/hello', router);
app.use('/api', userRouter)

app.listen(process.env.SERVER_PORT, () => {console.log('Server berjalan di ' + process.env.SERVER_PORT)});
