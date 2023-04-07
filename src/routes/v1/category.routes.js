import express from 'express';
import categoryController from '../../controller/category.controller.js'
// import { protect, roles } from '../../middlewares/auth.js'

const router = express.Router()

router
  // .get('/cari', protect, roles, categoryController.searching)
  .get('/all', categoryController.getAll)
  .get('/', categoryController.getAllCategory)
  .get('/:id', categoryController.getCategory)
  .post('/', categoryController.insertCategory)
  .put('/:id', categoryController.updateCategory)
  .delete('/:id', categoryController.deleteCategory)

export default router
