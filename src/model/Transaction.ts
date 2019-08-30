export default class Transaction {
    ValorBruto: number;
    Adquirente: string;
    Mdr: number;

    constructor(Adquirente: string, ValorBruto: number, Mdr: number) {
        this.Adquirente = Adquirente;
        this.ValorBruto = ValorBruto;
        this.Mdr = Mdr;
    }

    calculateValorBruto(): number {
        return this.ValorBruto - (this.ValorBruto / 100) * this.Mdr;
    }
}
