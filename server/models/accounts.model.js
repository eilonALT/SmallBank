const mongoose = require('mongoose');

const accountsSchema = mongoose.Schema({
    accountNumber: Number,
    overallBalance: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('accounts', accountsSchema);