import express from "express";
import transakasiController from "../../controller/transaksi.controller.js";
import { protect } from '../../middlewares/auth.js'

const router = express.Router();

router.get("/", transakasiController.getTransaksi);
router.get("/:id", protect, transakasiController.getTransaksi);
router.post("/", transakasiController.insert);
router.put("/:id", protect, transakasiController.update);
router.delete("/:id", protect, transakasiController.delete);

export default router;
