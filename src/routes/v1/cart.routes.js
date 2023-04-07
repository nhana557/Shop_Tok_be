import express from "express";
import cartControllers from "../../controller/cart.controller.js";
import { protect } from '../../middlewares/auth.js'

const router = express.Router();

router.get("/", protect, cartControllers.allCart);
router.post("/", cartControllers.insert);
router.put("/add/:id", cartControllers.add);
router.put("/min/:id", cartControllers.min);
router.delete("/:id", cartControllers.delete);


export default router;