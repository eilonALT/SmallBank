const mongoose = require('mongoose');

const opertionsSchema = mongoose.Schema({
    accountNumber: Number,
    type: String,
    amount: Number,
    date: Date,
    insert: Number,
    pays: Number,

}, {
    timestamps: true
});

module.exports = mongoose.model('opertions', opertionsSchema);