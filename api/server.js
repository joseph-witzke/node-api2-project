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

server.get('/api/posts/:id', async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(404).json({
                message: `The post with the specified ID ${id} does not exist`
            })
        } else {
            const post = await Posts.findById(req.params.id)
            res.status(200).json(post)
        }
    } catch (err) {
        res.status(500).json({
        message: "The post information could not be retrieved",
        error: err.message,
        })
    }
})

server.post('/api/posts', )


// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server