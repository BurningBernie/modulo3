var http = require('http');
var fs = require('fs');

var beatles = [{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic: "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic: "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic: "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic: "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

function findBeatle(beatleName) {
  let name = decodeURI(beatleName) // transformo el %20 de john%20lennon en john lennon
  return beatles.find((element) => element.name.toLocaleLowerCase().includes(name.toLowerCase()))
  /* magia que tiró Mati, esto hace que poniendo sólo nombre o sólo apellido igual lo encuentre*/
}

function sendJson(res, json, statusCode = 200) {
  res.writeHead(statusCode, { 'Content-type': 'application/json' })
  return res.end(JSON.stringify(json))
}

function sendHtml(res, html, statusCode = 200) {
  res.writeHead(statusCode, { 'Content-type': 'text/html' })
  return res.end(html)
}

function apiRouter(parsedUrl, _req, res) { // cuando es un _ antes del parámetro, no se usa ese parámetro
  let beatleName = parsedUrl[2] // tres posibles resultados: undefined, '', john%20lennon
  if (!beatleName) {
    return sendJson(res, beatles)
  }

  let theBeatle = findBeatle(beatleName)

  if (theBeatle) {
    return sendJson(res, theBeatle)
  }
  return sendJson(res, { message: 'escarabajo no encontrado' }, 400)
  // agrego un mensaje de error y cambio el código de respuesta
}

function createBeatleCard({name, birthdate, profilePic}) {
  return `
  <div class="card" style="width: 18rem;">
    <img src="${profilePic}" class="card-img-top" alt="${name}">
      <div class="card-body">
        <a href="/${name}" class="card-text">${name}</a>
        <p class="card-text">${birthdate}</p>
      </div>
  </div>
  `
}

function createDetail({name, birthdate, profilePic}){
  return `
  <div class="card" style="width: 18rem;">
  <h5 class="card-title">${name} </h5>
  <div class="card-body">
  <img src="${profilePic}" class="card-img-top" alt="${name}">
        <p class="card-text">${birthdate}</p>
      </div>
  </div>
  `
}



function createBeatleHTML(beatles) {
  return `<div>
    ${beatles.map((beatle) => createBeatleCard(beatle)).join(`\n`)}
  <div/>`
}

http.createServer(function (req, res) {
  let parsedUrl = req.url.split('/') // [ '' , 'api', 'jhon%20lennon'] ==> parsedUrl[1] = 'api'
  if ('api' === parsedUrl[1]) {
    return apiRouter(parsedUrl, req, res)

  } else {
    let indexHtml = fs.readFileSync('./index.html')
    res.writeHead(200, { 'Content-type': 'text/html' })
    indexHtml = indexHtml.toString().replace('{beatles}', createBeatleHTML())
    res.end(indexHtml)
  }


}).listen(3000, '127.0.0.1')


/* esto es sin cosas locas de Mati
http.createServer(function (req, res) {
  let parsedUrl = req.url.split('/') // [ '' , 'api', 'jhon%20lennon'] ==> parsedUrl[1] = 'api'
  if ('api' === parsedUrl[1]) {
    let beatleName = parsedUrl[2] // tres posibles resultados, undefined, '', john%20lennon
    if (!beatleName) {
      res.writeHead(200, { 'Content-type': 'application/json' })
      return res.end(JSON.stringify(beatles))
    }
    beatleName = decodeURI(beatleName) // transformo el %20 de john%20lennon en john lennon
    let theBeatle = beatles.find((element) => element.name.toLocaleLowerCase().includes(beatleName.toLowerCase()))
    // magia que tiró Mati, esto hace que poniendo solo nombre o solo apellido igual lo encuentre

    if(theBeatle){
      res.writeHead(200, { 'Content-type': 'application/json'})
      return res.end(JSON.stringify(theBeatle))
    }
    return res.end('no te encontré che')

  } else {
    let indexHtml = fs.readFileSync('./index.html')
    res.writeHead(200, { 'Content-type': 'text/html' })
    res.end(indexHtml)
  }


}).listen(3000, '127.0.0.1')
*/