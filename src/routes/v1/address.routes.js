import express from 'express';
import { protect } from '../../middlewares/auth.js';
import controllersAddress from '../../controller/address.contoller.js';

const router = express.Router()

router
    .post('/', protect, controllersAddress.create)
    .put('/', protect, controllersAddress.updateAddress)
    .get('/', protect, controllersAddress.getAddressUser)


export default router