// SEGUNDA CAMADA

import express from 'express';
import productController from '../controllers/product-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js';

// Instanciando o router do express
const router = express.Router();

// Definindo conexão das rotas com as responsabilidades do controller de product
router.route("/")
.get( productController.getAll) 
.post( productController.create) 

router.route("/:code")
.get( productController.getOne) 
.delete( productController.deleteOne) 
.put( productController.updateOne) 

router.route("/login")
.post(productController.login)

export default router;