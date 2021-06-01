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

server.post('/api/posts', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const newPost = await Posts.insert(req.body)
            res.status(201).json(newPost)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database",
            error: err.message,
        })
    }
})

server.put('/api/posts/:id', async (req, res) => {
    const { id } = req.params
    const { body } = req
    try {
        if (!updatedPost) {
            res.status(404).json({
                message: `"The post with the specified ID ${id} does not exist"`
            })
        } else {
            const updatedPost = await Posts.update(id, body)
            res.status(200).json(updatedPost)
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be modified",
            error: err.message,
        })
    }
})

server.delete('/api/posts/:id', async (req, res) => {
    const { id } = req.params
    Posts.remove(id)
        .then(deleted => {
            if (!deleted) {
                res.status(404).json({
                    message: `"The post with the specified ID ${id} does not exist"`
                })
            } else {
                res.json(deleted)
            }
        })
        .catch (err => {
            res.status(500).json({
                message: "The post could not be removed",
                error: err.message,
            })
        })
})





// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server