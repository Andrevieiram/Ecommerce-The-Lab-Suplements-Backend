import express from 'express';
import userController from '../controllers/user-controller.js'

// Criando rotas para o recurso user
const router = express.Router();
router.route("/")
.get(userController.getAll) 
.post(userController.create) 

router.route("/:id")
.get(userController.getOne) 
.delete(userController.deleteOne) 
.put(userController.updateOne) 

router.route("/login")
.post(userController.login)

export default router;