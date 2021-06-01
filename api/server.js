// implement your server here
// require your posts router and connect it here

//imports

const express = require('express')
const Posts = require('./posts/posts-model')

//Instances of express APP
const server = express()

//Global Middleware
server.use(express.json())

//Endpoints
server.get('/api/posts', (req, res) => {
    Posts.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({ message: "The posts information could not be retrieved",
        error: err.message,
    })
    })
})


// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server