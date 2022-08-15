const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
var posts = [];
var id = 1

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', function (req, res) {

    if (req.body.author && req.body.title && req.body.contents) {
        let objPost = {
            author: req.body.author,
            title: req.body.title,
            contents: req.body.contents,
            id
        }
        id++
        posts.push(objPost)
        return res.status(200).json(objPost)
    } else {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
})

server.post('/posts/author/:author', function (req, res) {

    if (req.body.title && req.body.contents) {
        let objPost = {
            author: req.params.author,
            title: req.body.title,
            contents: req.body.contents,
            id
        }
        id++
        posts.push(objPost)
        return res.status(200).json(objPost)
    } else {
        return res.status(STATUS_USER_ERROR).json({ error: "No se recibieron los parámetros necesarios para crear el Post" })
    }
})

server.get('/posts', function (req, res) {
    if (req.query.term) {
        let aux = posts.filter(e => e.title.includes(req.query.term) || e.contents.includes(req.query.term))
        return res.json(aux)
    } else {
        return res.json(posts)
    }
})

server.get('/posts/:author', function (req, res) {
    if (req.params.author) {
        let postAutor = posts.filter(a => a.author.includes(req.params.author))
        if (postAutor[0]) {
            return res.status(200).json(postAutor)
        }
    }
    return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post del autor indicado" })

})

server.get('/posts/:author/:title', function (req, res) {
    let auxii = posts.filter(e => e.title.includes(req.params.title) && e.author.includes(req.params.author))
    if (auxii[0]) {
        return res.json(auxii)
    } else {
        return res.status(STATUS_USER_ERROR).json({ error: "No existe ningun post con dicho titulo y autor indicado" })
    }
})

server.put('/posts/', function (req, res) {
    if (req.body.title && req.body.id && req.body.contents) {
        let idPost = posts.find(i => i.id === req.body.id)
        if (idPost) {
            idPost.title = req.body.title
            idPost.contents = req.body.contents
            res.status(200).json(idPost)
        } else {
            res.status(422).json({ error: "No existe ningun post con dicho id" })
        }
    } else {
        res.status(422).json({ error: "No se recibieron los parámetros necesarios para modificar el Post" })
    }
})

server.delete('/posts/', function (req, res) {
    if (req.body.id) {
        let auxiii = posts.find(p => p.id === req.body.id)
        if (auxiii) {
            posts = posts.filter(p => p.id !== req.body.id)
            res.status(200).json({ success: true })
        } else {
            res.status(422).json({ error: "id inexistente" })
        }
    } else {
        res.status(422).json({ error: "id inválido" })
    }
})

server.delete('/author/', function(req,res) {
    if (req.body.author) {
        let auxiv = posts.filter(p => p.author === req.body.author)
        if (auxiv[0]) {
            posts = posts.filter(p => p.author !== req.body.author)
            res.status(200).json(auxiv)
        } else {
            res.status(422).json({error: "No existe el autor indicado"})
        }
    } else {
        res.status(422).json({ error: "author inválido" })
    }
})

module.exports = { posts, server };
