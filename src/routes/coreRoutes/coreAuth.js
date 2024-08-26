import express from 'express';
import authAdmin from '../../controller/coreController/adminAuth/index.js';
import { catchErrors } from '../../utils/errorhandler.js';

const router = express.Router();

router.route('/login').post(catchErrors(authAdmin.login));

export default router;
