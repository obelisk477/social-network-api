const { connect, connection } = require('mongoose')

// Sets connection string to .env variable if local connection not available
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB'
connect(connectionString)

module.exports = connection