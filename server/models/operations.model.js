const mongoose = require('mongoose');

const operationsSchema = mongoose.Schema({
    accountNumber: Number,
    type: String,
    amount: Number,
    date: Date,
    insert: Number,
    pays: Number,

}, {
    timestamps: true
});

module.exports = mongoose.model('operations', operationsSchema);