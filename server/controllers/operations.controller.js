const AccountOperation = require('../models/operations.model');

// Create and Save a new AccountOperation
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "AccountOperation content can not be empty"
        });
    }

    // Create a AccountOperation
    const newAccountOperation = new AccountOperation({
        accountNumber: +req.body.accountNumber || 0,
        type: req.body.type || {},
        amount: +req.body.amount || 0,
        date: req.body.date || new Date(),
        insert: +req.body.insert || 0,
        pays: +req.body.pays || 0,
    });

    // Save AccountOperation in the database
    newAccountOperation.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the AccountOperation."
            });
        });
};

// Retrieve and return all AccountOperations from the database.
exports.findAll = (req, res) => {
    AccountOperation.find().then(AccountOperations => {
        res.send(AccountOperations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving AccountOperations."
        });
    });
};

// Find a single AccountOperation with a AccountOperationId
exports.findOne = (req, res) => {
    AccountOperation.findById(req.params.id)
        .then(AccountOperation => {
            if (!AccountOperation) {
                return res.status(404).send({
                    message: "AccountOperation not found with id " + req.params.id
                });
            }
            res.send(AccountOperation);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "AccountOperation not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving AccountOperation with id " + req.params.id
            });
        });
}
// find all accountOperations by accountNumber
exports.findAllByAccountNumber = (req, res) => {
    AccountOperation.find({ accountNumber: +req.query.accountNumber })
        .then(AccountOperations => {
            res.send(AccountOperations);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving AccountOperations."
            });
        });
}


