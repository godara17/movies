"use strict"

// require dependencies
const express = require("express")
const path = require("path")
const http = require("http")
const bodyParser = require('body-parser')

// define app here
const app = express()

// initaillize app using different middleware functions
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }))
app.use(require('./server/controller'))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'))
})


// start server
const port = process.env.PORT || '3027'
app.set('port', port)
const server = http.createServer(app)
server.listen(port, () => console.log(`API running on localhost:${port}`))
