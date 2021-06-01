//imports

const express = require('express')
const postsRouter = require('./posts/posts-router')

//Instances of express APP
const server = express()

//Global Middleware
server.use(express.json())
server.use('/api/posts', postsRouter)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server