const axios = require('axios');
const CryptoCurrency = require('../Models/CryptoModel');
const cron = require('node-cron');
function fetchCryptoData() {
    cron.schedule('0 */2 * * *' ,  async () => {
        
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
    console.log(req.body);
    const { coin } = req.query;
    try {
        const data = await CryptoCurrency.findOne({ coin }).sort({ timestamp: -1 });
        if (!data) return res.status(404).json({ error: 'Coin data not found' });

        res.json({
            price: data.price,
            marketCap: data.marketCap,
            '24hChange': data.change24h,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } 
}


module.exports = {fetchCryptoData , stats};

