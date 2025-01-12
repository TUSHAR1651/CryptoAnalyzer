const mongoose = require('mongoose');
const Router = require('express');
const CryptoRouter = Router();
const {stats} = require('../Controllers/CryptoController');

CryptoRouter.get('/stats', stats);

module.exports = CryptoRouter;