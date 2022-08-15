const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
      agent.get('/').then((res) => {
        expect(res.body.message).toEqual('hola');
      }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
  });

  describe('POST /product', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 35 })
        .then((res) => {
          expect(200)
        }))
    it('responds with 400', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 'r' })
        .then((res) => {
          expect(400)
          expect(res.body.result).toEqual(false);
        }))
    it('responde con dos valores sumados que den num', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
    it('responde false cuando no es así', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5], num: 10 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
    it('responde false cuando no es así', () =>
      agent.post('/sumArray')
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 0 })
        .then((res) => {
          expect(res.body.result).toEqual(false);
        }));
  });


  describe('POST /numString', () => {
    it('Responder con status 200.', () =>
      agent.post('/numString')
        .send({ string: 'HOLa' }).expect(200)
    );
    it('Responder con un status 400(bad request) si el string es un número.', () =>
      agent.post('/numString')
        .send({ string: 3 }).expect(400)
    )
    it('Responder con un status 400(bad request) si el string esta vacio.', () =>
      agent.post('/numString')
        .send({ string: '' }).expect(400)
    )
    it('Responder con 4 si enviamos hola', () => agent.post('/numString')
      .send({ string: 'HOLa' })
      .then((res) => {
        expect(res.body.result).toEqual(4)
      }))
  })


  describe('POST /numString', () => {
/*
  Responder con status 200.
  Responder con al funcionalidad del pluck.
  Responder con un status 400 (bad request) si array no es un arreglo.
  Responder con un status 400 (bad request) si el string propiedad está vacio.


*/







});

