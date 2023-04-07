import express from 'express';
// import { protect } from '../../middlewares/auth';
import storeController from '../../controller/Store.controller.js';
import upload from '../../middlewares/upload.js';

const router = express.Router();

router
    .get('/', storeController.getStore)
    .get('/:id', storeController.getStoreById)
    .put('/update/:id', upload, storeController.updateStore)

export default router;
