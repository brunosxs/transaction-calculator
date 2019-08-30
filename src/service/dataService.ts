import { Entry } from '../model/Entry';

import data from './data.json';

export default class DataService {
    private static instance: DataService;
    public static getInstance(): DataService {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return this.instance;
    }

    getAll(transform: boolean): Entry[] {
        let entries: Entry[] = [];
        if (transform) {
            for (let i = 0; i < data.length; i++) {
                const entry = { ...data[i] };
                entry.Adquirente = `Adquirente ${entry.Adquirente}`;
                entries.push(entry);
            }
        } else {
            entries = data;
        }

        return entries;
    }
    /**
     * Searchs and returns an entry that has the AdquirenteName
     * @param {string} adquirenteName - Name to search for
     * @return {Entry} Entry with the Adquirente
     */
    getByAdquirente(adquirenteName: string): Entry {
        return data.filter(entry => {
            return entry.Adquirente === adquirenteName;
        })[0];
    }

    getAllAdquirenteNames(): string[] {
        const returnedNames: string[] = [];
        for (let i = 0; i < data.length; i++) {
            const entry = data[i];
            returnedNames.push(entry.Adquirente);
        }
        return returnedNames;
    }
}
