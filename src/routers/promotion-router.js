import express from 'express';
import promotionController from '../controllers/promotion-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.route("/")
    .get(authMiddleware, promotionController.getAll) 
    .post(authMiddleware, promotionController.create); 

router.route("/:id")
    .get(authMiddleware, promotionController.getOne) 
    .delete(authMiddleware, promotionController.deleteOne) 
    .put(authMiddleware, promotionController.updateOne);

export default router;