const path = require('path')
require('dotenv').config({path: path.join(__dirname, "../../.env")})

module.exports = {
  "development": {
    "username": process.env.DATABASE_USER,
    "password": process.env.DATABASE_PASSWORD,
    "database": process.env.DATABASE_NAME2,
    "host": process.env.DATABASE_HOST,
    "port": process.env.DATABASE_PORT,
    "dialect": "mysql"
  },
  /* "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  } */
}
