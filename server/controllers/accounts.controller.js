const Account = require('../models/accounts.model');

let accountId = 1;

// Create and Save a new Account
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Account content can not be empty"
        });
    }
    
    // Create a Account
    const newAccount = new Account({
        accountNumber: +req.body.accountNumber,
        overallBalance: 0,
    });

    // Save Account in the database
    newAccount.save()
        .then(data => {
            const { accountNumber, overallBalance } = data;
            res.send({ accountNumber, overallBalance });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Account."
            });
        });
};

// Retrieve and return all Accounts from the database.
exports.findAll = (req, res) => {
    Account.find().then(Accounts => {
        res.send(Accounts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Accounts."
        });
    });
};

// Find a single Account with a id
exports.findOne = (req, res) => {
    Account.findById(req.params.id)
        .then(Account => {
            if (!Account) {
                return res.status(404).send({
                    message: "Account not found with id " + req.params.id
                });
            }
            res.send(Account);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Account not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Account with id " + req.params.id
            });
        });
};

// Update a Account identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Account content can not be empty"
        });
    }

    // Find Account and update it with the request body
    Account.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Account",
        content: req.body.content
    }, { new: true })
        .then(Account => {
            if (!Account) {
                return res.status(404).send({
                    message: "Account not found with id " + req.params.id
                });
            }
            res.send(Account);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Account not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Account with id " + req.params.id
            });
        });
};

// Delete a Account with the specified id in the request
exports.delete = (req, res) => {
    Account.findByIdAndRemove(req.params.id)
        .then(Account => {
            if (!Account) {
                return res.status(404).send({
                    message: "Account not found with id " + req.params.id
                });
            }
            res.send({ message: "Account deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Account not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Account with id " + req.params.id
            });
        });
};