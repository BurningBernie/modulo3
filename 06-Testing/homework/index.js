const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'test',
  });
});

app.post('/sum', (req, res) => {
  const { a, b } = req.body
  res.send({
    result: a + b
  });
});

app.post('/product', (req, res) => {
  const { a, b } = req.body
  res.send({ result: a * b });
});

app.post('/sumArray', (req, res) => {
  const { array, num } = req.body
  if (typeof num === 'number') {
    for (i = 0; i < array.length - 1; i++) {
      for (j = i + 1; j < array.length; j++) {
        if (array[i] + array[j] === num) {
          return res.status(200).json({ result: true })
        }
      }
    }
  }
  return res.status(400).json({ result: false, });
});

app.post('/numString', (req, res) => {
  const {string} = req.body
  if (typeof string === 'string' && string) {
   return res.status(200).json({result: string.length})
  }
  return res.status(400).json(false)
})

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
