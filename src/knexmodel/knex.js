const knexconfig = require('./knexfile')
const knex = require('knex')(knexconfig[process.env.NODE_ENV || 'development'])

module.exports = knex