import knexInstance from 'Server/database/connection'

jest.mock('knex', () => ({
    clearHeaderData() {

    },
    clearLocale() {

    }
}));

jest.mock('./db', () => ({
    clearHeaderData() {

    },
    clearLocale() {

    }
}));


describe('DB Connection', () => {
    describe('Instantiate Connection', () => {
        test('We have an instance if it exists already', () => {
            knexInstance;
        });
    });
});