import DataService from './dataService';

const dataservice = DataService.getInstance();

describe('Data Service tests', () => {
    it("Return all data'", async () => {
        const check = ['A', 'B', 'C'];
        let i = 0;
        dataservice.getAll(false).forEach(entry => {
            expect(entry.Adquirente).toBe(check[i]);
            i++;
        });
    });

    it("Return all data with Adquirente transformed to 'Adquirente X'", async () => {
        const check = ['Adquirente A', 'Adquirente B', 'Adquirente C'];
        let i = 0;
        dataservice.getAll(true).forEach(entry => {
            expect(entry.Adquirente).toBe(check[i]);
            i++;
        });
    });

    it("Return 'Adquirente B'", async () => {
        expect(await dataservice.getByAdquirente('B')).not.toBeNull();
    });
    it("Fail to find 'Adquirente Z'", async () => {
        expect(await dataservice.getByAdquirente('Z')).toBeUndefined();
    });
});
