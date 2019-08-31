import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { Controller } from './controller';
import * as dotenv from 'dotenv';
import { apiErrorHandler } from './middleware/apiErrorHandler';
import { requestValidator } from './middleware/requestValidator';

dotenv.config();

export const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.get('/', Controller.helloWorld);

app.get('/mdr', Controller.merchantDiscountRate);

app.post('/transaction', requestValidator, Controller.transaction);

app.use(apiErrorHandler);
