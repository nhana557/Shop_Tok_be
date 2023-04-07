import express from "express";
import paymentController from "../../controller/payment.controller.js";
// import { protect } from '../../middlewares/auth.js'

const router = express.Router();

router.get("/", paymentController.allPayment);
router.post("/", paymentController.insert);
router.put("/:id", paymentController.update);
router.delete("/:id", paymentController.delete);

export default router;