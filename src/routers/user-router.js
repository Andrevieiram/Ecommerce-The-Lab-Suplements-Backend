import express from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const router = express.Router();

router.route("/")
    .post(userController.create) 
    .get(authMiddleware, userController.getAll); 

router.route("/login")
    .post(userController.login);

router.route("/:id")
    .delete(authMiddleware, userController.deleteOne);

router.route("/:id")
    .delete(authMiddleware, userController.deleteOne)
    .put(authMiddleware, userController.update); 

export default router;