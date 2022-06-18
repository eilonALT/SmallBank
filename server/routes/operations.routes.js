module.exports = (app) => {
    const Operation = require('../controllers/operations.controller');

    // Create a new Operation
    app.post('/operations', Operation.create);

    // Retrieve all Operation
    app.get('/operations', (req, res) => {
        if (req?.query?.accountNumber) {
            Operation.findAllByAccountNumber(req, res);
        }
        else {
            Operation.findAll(req, res);
        }
    });

    // Retrieve a single Operation with id
    app.get('/operations/:id', Operation.findOne);

}