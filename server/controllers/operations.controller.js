const AccountOpertion = require('../models/operations.model');

// Create and Save a new AccountOpertion
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "AccountOpertion content can not be empty"
        });
    }

    // Create a AccountOpertion
    const newAccountOpertion = new AccountOpertion({
        accountNumber: +req.body.accountNumber || 0,
        type: req.body.type || {},
        amount: +req.body.amount || 0,
        date: req.body.date || new Date(),
        insert: +req.body.insert || 0,
        pays: +req.body.pays || 0,
    });

    // Save AccountOpertion in the database
    newAccountOpertion.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the AccountOpertion."
            });
        });
};

// Retrieve and return all AccountOpertions from the database.
exports.findAll = (req, res) => {
    AccountOpertion.find().then(AccountOpertions => {
        res.send(AccountOpertions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving AccountOpertions."
        });
    });
};

// Find a single AccountOpertion with a AccountOpertionId
exports.findOne = (req, res) => {
    AccountOpertion.findById(req.params.id)
        .then(AccountOpertion => {
            if (!AccountOpertion) {
                return res.status(404).send({
                    message: "AccountOpertion not found with id " + req.params.id
                });
            }
            res.send(AccountOpertion);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "AccountOpertion not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving AccountOpertion with id " + req.params.id
            });
        });
}
// find all accountOpertions by accountNumber
exports.findAllByAccountNumber = (req, res) => {
    AccountOpertion.find({ accountNumber: +req.query.accountNumber })
        .then(AccountOpertions => {
            res.send(AccountOpertions);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving AccountOpertions."
            });
        });
}


