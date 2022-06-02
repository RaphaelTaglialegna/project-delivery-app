const express = require('express');

const {
  createSale,
  getAllSales, 
  getCostumerSales, getSellerSales, getSale,
  statusUpdateDelivered, statusUpdatePrepare, statusUpdateToDeliver,
} = require('../controllers/SalesController');
const { authorizationGeneral } = require('../middlewares/tokenAuth');

const salesRoute = express.Router();

salesRoute.get('/', authorizationGeneral, getAllSales);
salesRoute.post('/', createSale);
salesRoute.get('/:id', authorizationGeneral, getSale);
salesRoute.get('/costumer/:id', authorizationGeneral, getCostumerSales);
salesRoute.get('/seller/:id', authorizationGeneral, getSellerSales);

salesRoute.patch('/delivered/:id', statusUpdateDelivered);
salesRoute.patch('/prepare/:id', statusUpdatePrepare);
salesRoute.patch('/todeliver/:id', statusUpdateToDeliver);

module.exports = salesRoute;