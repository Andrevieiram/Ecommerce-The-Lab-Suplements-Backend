// routes/user-router.js

import express from 'express';
import userController from '../controllers/user-controller.js'

// Criando rotas para o recurso user
const router = express.Router();

// Rotas para /api/users
router.route("/")
.get(userController.getAll) 
.post(userController.create) 

// Rotas para /api/users/:id
router.route("/:id")
.get(userController.getOne) 
.delete(userController.deleteOne) 
.put(userController.updateOne) 

// Rota específica para /api/users/login
router.route("/login")
.post(userController.login)

export default router;