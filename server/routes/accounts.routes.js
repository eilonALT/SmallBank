module.exports = (app) => {
    const Account = require('../controllers/accounts.controller');

    // Create a new Account
    app.post('/accounts', Account.create);

    // Retrieve all account
    app.get('/accounts', Account.findAll);

    // Retrieve a single account with id
    app.get('/accounts/:id', Account.findOne);

    // Update a account with id
    app.put('/accounts/:id', Account.update);

    // Delete a account with id
    app.delete('/accounts/:id', Account.delete);

}