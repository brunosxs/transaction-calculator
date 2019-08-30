import { Request, Response, NextFunction } from "express";
import DataService from "./service/dataService";
import Transaction from "./model/Transaction";

export class Controller {

    static async helloWorld(req: Request, res: Response, next: NextFunction) {
        return res.send("Hello from the api")
    }

    static async merchantDiscountRate(req: Request, res: Response, next: NextFunction) {

        res.status(200).json(DataService.getInstance().getAll(true))
    }

    static async transaction(req: Request, res: Response, next: NextFunction) {

        const { Valor, Adquirente, Bandeira, Tipo } = req.body;
        const adquirente = DataService.getInstance().getByAdquirente(Adquirente);
        let mdr = 0;
        const taxa = adquirente.Taxas.filter(t => {
            return t.Bandeira.toLowerCase() === Bandeira
        })[0]


        if (Tipo === "credito") {
            mdr = taxa.Credito;
        } else if (Tipo === "debito") {
            mdr = taxa.Debito;
        }
        const transaction = new Transaction(Adquirente, Valor, mdr);
        res.status(200).send({ "ValorBruto": transaction.calculateValorBruto() })

    }
}