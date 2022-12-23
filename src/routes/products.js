const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const { getAllProduct, getProduct, insertProduct, updateProduct, deleteProduct, getProductById } = require('../controller/products')
const { protect, roles } = require('../middlewares/auth')
const { cacheProduct, clearCacheProductDetail } = require('../middlewares/redis')

router
  // .get('/cari', searching)
  .get('/', getAllProduct)
  .get('/:id',getProduct)
  .get('byid/:id', getProductById)
  .post('/', upload, insertProduct)
  .put('/:id',  upload, updateProduct)
  .delete('/:id', clearCacheProductDetail, deleteProduct)

module.exports = router
