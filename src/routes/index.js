import express from 'express';

import products from './v1/products.routes.js';
import category from './v1/category.routes.js';
import payment from './v1/payment.routes.js';
import toko from './v1/toko.routes.js';
import transaksi from './v1/transaksi.routes.js';
import cart from './v1/cart.routes.js';
import user from './v1/auth.routes.js';
import address from './v1/address.routes.js';

const Routes = express.Router()

Routes
    .use('/products', products)
    .use('/category', category)
    .use('/payment', payment)
    .use('/toko', toko)
    .use('/transaksi', transaksi)
    .use('/auth', user)
    .use('/cart', cart)
    .use('/address', address)

export default Routes;