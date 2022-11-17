const express = require("express");
const router = express.Router();
const transaksi_detailController = require("../controller/transaksi_detail");
const {protect} = require('../middlewares/auth')


router.get("/", transaksi_detailController.allTransaksiDetail);
router.post("/",protect, transaksi_detailController.insert);
router.put("/:id",protect, transaksi_detailController.update);
router.delete("/:id",protect, transaksi_detailController.delete);


module.exports = router;