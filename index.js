const express = require('express')
const db = require('./config/connection')
const routes = require('./routes')

// Sets port to .env variable if local connection not available
const PORT = process.env.PORT || 3001
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)

// Only begins listening on port once db connection is open
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`)
    })
})