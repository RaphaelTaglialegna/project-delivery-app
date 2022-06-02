const express = require('express');

const {
  createSale,
  getAllSales,
  getCostumerSales, getSellerSales, getSale,
  statusUpdateDelivered, statusUpdatePrepare, statusUpdateToDeliver,
} = require('../controllers/SalesController');

const { authorizationGeneral } = require('../middlewares/tokenAuth');
const Validation = require('../middlewares/validations');

const salesRoute = express.Router();

salesRoute.get('/', authorizationGeneral, getAllSales);
salesRoute.post('/', authorizationGeneral, Validation, createSale);
salesRoute.get('/:id', authorizationGeneral, getSale);
salesRoute.get('/costumer/:id', authorizationGeneral, getCostumerSales);
salesRoute.get('/seller/:id', authorizationGeneral, getSellerSales);

salesRoute.patch('/delivered/:id', authorizationGeneral, statusUpdateDelivered);
salesRoute.patch('/prepare/:id', authorizationGeneral, statusUpdatePrepare);
salesRoute.patch('/todeliver/:id',authorizationGeneral, statusUpdateToDeliver);

module.exports = salesRoute;