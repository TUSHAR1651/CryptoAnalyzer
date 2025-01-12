

const mongoose = require('mongoose');
const Crypto = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    marketCap: {
        type: Number,
        required: true,
    },
    change24h: {
        type: Number,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
});


module.exports = mongoose.model('CryptoCurrency', Crypto);