export interface Entry {
    Adquirente: string;
    Taxas: Taxa[];
}

export interface Taxa {
    Bandeira: string;
    Credito: number;
    Debito: number;
}
