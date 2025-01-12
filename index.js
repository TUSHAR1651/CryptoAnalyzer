const monogoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

const CryptoRouter = require('./Routes/CryptoRoute');
const {fetchCryptoData} = require('./Controllers/CryptoController');
const dotenv = require('dotenv');
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT;
const URL = process.env.DB_URL;


app.use('/crypto', CryptoRouter);

monogoose.connect(URL)
.then(() => {
    console.log("connected to Mongo DB");
})
.catch((error) => {
    console.log(error);
});




app.listen(PORT , () => {
    console.log("Server Started");
});

fetchCryptoData();