import express from 'express';
import promotionController from '../controllers/promotion-controller.js'

const router = express.Router();
router.route("/")
.get(promotionController.getAll) 
.post(promotionController.create) 

router.route("/:id")
.get(promotionController.getOne) 
.delete(promotionController.deleteOne) 
.put(promotionController.updateOne) 

router.route("/login")
.post(promotionController.login)

export default router;