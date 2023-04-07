import express from 'express'
import upload from '../../middlewares/upload.js'
import productsController from '../../controller/products.controller.js'
// import { protect, roles } from '../../middlewares/auth.js'
// import { cacheProduct, clearCacheProductDetail } from '../../middlewares/redis.js'
const {
  getAllProduct,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  getProductById
} = productsController;

const router = express.Router();

router
  // .get('/cari', searching)
  .get('/', getAllProduct)
  .get('/:id', getProduct)
  .get('byid/:id', getProductById)
  .post('/', upload, insertProduct)
  .put('/:id', upload, updateProduct)
  .delete('/:id', deleteProduct)

export default router
