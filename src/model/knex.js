const knexconfig = require('./knexfile')
const knexQuery = require('knex')(knexconfig[process.env.NODE_ENV || 'development'])

module.exports = knexQuery