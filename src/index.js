require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {sequelize} = require('./models')

const router = require('./routes/router');
const authRouter = require('./routes/authRoute')
const userRouter = require('./routes/userRoute')

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

/* this is for check connection to mysql */
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Database Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

app.use('/', router);
app.use('/auth', authRouter)
app.use('/user', userRouter)

app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
