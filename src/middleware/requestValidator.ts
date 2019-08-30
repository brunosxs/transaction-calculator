import { Request, Response, NextFunction, RequestHandler } from 'express';
import { APIError } from './responseMessages';
import DataService from '../service/dataService';

const dataService = DataService.getInstance();

// All the following could be optimized with a db query
const bandeiraChecker = ['master', 'visa'];
const adiquirenteChecker = dataService.getAllAdquirenteNames();
const tipoChecker = ['credito', 'debito'];

enum VALUETYPE {
    ADQUIRENTE,
    BANDEIRA,
    TIPO,
}

export const validateInput = (value: string, type: VALUETYPE): boolean => {
    let checkerArray: string[] = [];

    if (type === VALUETYPE.ADQUIRENTE) checkerArray = adiquirenteChecker;
    if (type === VALUETYPE.BANDEIRA) checkerArray = bandeiraChecker;
    if (type === VALUETYPE.TIPO) checkerArray = tipoChecker;

    return checkerArray.includes(value);
};

export const requestValidator: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { Valor, Adquirente, Bandeira, Tipo } = req.body;

    if ((typeof Valor || typeof Adquirente || typeof Bandeira || typeof Tipo) === 'undefined') {
        next(
            new APIError(
                'Missing data',
                "The request couldn't be processed - Required data was not sent to the server, ",
                422,
            ),
        );
    }
    if (isNaN(parseFloat(Valor))) next(new APIError('Parameter type error', 'Valor should be a number', 422));

    if (parseFloat(Valor) <= 0) {
        next(new APIError('Parameter range error', 'Valor should be greater than 0', 422));
    }

    if (!validateInput(Adquirente, VALUETYPE.ADQUIRENTE)) {
        next(
            new APIError(
                'Not valid value',
                `Adquirente should be one of the valid values: ${adiquirenteChecker.toString()}`,
                422,
            ),
        );
    }

    if (!validateInput(Bandeira, VALUETYPE.BANDEIRA)) {
        next(
            new APIError(
                'Not valid value',
                `Bandeira should be one of the valid values: ${bandeiraChecker.toString()}`,
                422,
            ),
        );
    }

    if (!validateInput(Tipo, VALUETYPE.TIPO)) {
        next(new APIError('Not valid value', `Tipo should be one of the valid values: ${tipoChecker.toString()}`, 422));
    }
    next();
};
