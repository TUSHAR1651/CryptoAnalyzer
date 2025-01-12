const monogoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const CryptoRouter = require('./Routes/CryptoRoute');
const {fetchCryptoData} = require('./Controllers/CryptoController');

app.use(cors());
app.use(express.json());

app.use('/crypto', CryptoRouter);

monogoose.connect('mongodb://127.0.0.1:27017/CurrencyDB')
.then(() => {
    console.log("connected to Mongo DB");
})
.catch((error) => {
    console.log(error);
});




app.listen(port , () => {
    console.log("Server Started");
});

fetchCryptoData();