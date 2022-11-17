const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const {protect} = require('../middlewares/auth')


router.get("/",protect, paymentController.allPayment);
router.post("/",protect, paymentController.insert);
router.put("/:id",protect, paymentController.update);
router.delete("/:id",protect, paymentController.delete);

module.exports = router;