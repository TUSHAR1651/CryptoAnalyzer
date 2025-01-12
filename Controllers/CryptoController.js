const axios = require('axios');
const CryptoCurrency = require('../Models/CryptoModel');
const cron = require('node-cron');
function fetchCryptoData() {
    cron.schedule('* * * * *' ,  async () => {
        
        try{
            const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'bitcoin,matic-network,ethereum',
                    vs_currencies: 'usd',
                    include_market_cap: 'true',
                    include_24hr_change: 'true',
                },
            });
            const data = response.data;
             
            for (const [coin, details] of Object.entries(data)) {
                await CryptoCurrency.create({
                    name: coin,
                    coin: coin,
                    price: details.usd,
                    marketCap: details.usd_market_cap,
                    change24h: details.usd_24h_change,
                    time: new Date()
                });
            }
            console.log('Data fetched and stored successfully');
        }
        catch(error){
            console.error('Error fetching data:', error);
        }
    });

}

const stats = async function(req , res){
    console.log(req.query);
}


module.exports = {fetchCryptoData , stats};

