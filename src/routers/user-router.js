import express from 'express';
import userController from '../controllers/user-controller.js'

// Criando rotas para o recurso user
const router = express.Router();
router.route("/")
.get(userController.getAll) //getAll
.post(userController.create) //create

router.route("/:id")
.get(userController.getOne) //getOne
.delete(userController.deleteOne) //deleteOne
.put(userController.updateOne) //updateOne

export default router;