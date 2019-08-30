import supertest = require('supertest');
import { app } from '../app';

describe('requestValidator Middleware', () => {
    it('Fails request missing Valor', async () => {
        const result = await supertest(app)
            .post('/transaction')
            .send({ Adquirente: 'C', Bandeira: 'visa', Tipo: 'credito' });
        expect(result.error.status).toEqual(422);
    });
    it('Fails request missing Adquirente', async () => {
        const result = await supertest(app)
            .post('/transaction')
            .send({ Valor: 22.3, Bandeira: 'visa', Tipo: 'credito' });
        expect(result.error.status).toEqual(422);
    });
    it('Fails request missing Bandeira', async () => {
        const result = await supertest(app)
            .post('/transaction')
            .send({ Valor: 22.3, Bandeira: 'visa', Tipo: 'credito' });
        expect(result.error.status).toEqual(422);
    });

    it('Fails request missing Tipo', async () => {
        const result = await supertest(app)
            .post('/transaction')
            .send({ Valor: 100, Adquirente: 'A', Bandeira: 'visa' });
        expect(result.error.status).toEqual(422);
        console.log(result.error.name);
    });
});
