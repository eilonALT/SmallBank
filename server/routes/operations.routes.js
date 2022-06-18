module.exports = (app) => {
    const Opertion = require('../controllers/operations.controller');

    // Create a new Opertion
    app.post('/opertions', Opertion.create);

    // Retrieve all Opertion
    app.get('/opertions', (req, res) => {
        if (req?.query?.accountNumber) {
            Opertion.findAllByAccountNumber(req, res);
        }
        else {
            Opertion.findAll(req, res);
        }
    });

    // Retrieve a single Opertion with id
    app.get('/opertions/:id', Opertion.findOne);

}