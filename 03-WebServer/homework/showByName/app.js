var fs = require("fs")
var servidor = require("http")

// Escribí acá tu servidor

servidor.createServer(function (req, res) {
    //fs.readFile(__dirname + `/images${req.url}.jpg`, function ( err, data)) {}
    // con esta forma de escritura es lo mimso que con el '.' antes de /images
    fs.readFile(`./images${req.url}.jpg`, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('Direccion incorrecta')
        } else {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(data)
        }
    })
}).listen(3000, '127.0.0.1')
