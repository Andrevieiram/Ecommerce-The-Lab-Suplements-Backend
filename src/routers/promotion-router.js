import express from 'express';
import promotionController from '../controllers/promotion-controller.js'

const router = express.Router();


router.get("/getall",promotionController.getAll)

router.post("/create",promotionController.create)

router.delete("/delete/:id", promotionController.deleteOne)

router.get("/get/:id", promotionController.getOne)

router.put("/update/:id", promotionController.updateOne)



export default router;