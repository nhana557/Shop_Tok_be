const express = require('express')
const Routes = express.Router()

const products = require('./products')
const category = require('./category')
const payment = require('./payment')
const transaksi = require('./transaksi')
const transaksi_detail = require('./transaksi_detail')
const user = require('./auth')

Routes
    .use('/products', products)
    .use('/category', category)
    // .use('/payment', payment)
    .use('/transaksi', transaksi)
    .use('/auth', user)
    // .use('/transaksi_detail', transaksi_detail)
module.exports = Routes