import supertest = require('supertest');
import { app } from './app';

it('Get access /mdr', async () => {
    const result = await supertest(app).get('/mdr');
    expect(result.status).toEqual(200);
});

describe('/transaction', () => {
    it('Return ValorBruto as 98', async () => {
        const result = await supertest(app)
            .post('/transaction')
            .send({ Valor: 100, Adquirente: 'A', Bandeira: 'visa', Tipo: 'debito' });
        expect(result.body).toEqual({ ValorBruto: 98 });
    });
});
