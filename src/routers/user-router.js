import express from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js'; 

const router = express.Router();

router.route("/")
    .post(authMiddleware, userController.create) 
    .get(authMiddleware, userController.getAll); 

router.route("/login")
    .post(userController.login);

export default router;