// SEGUNDA CAMADA

import express from 'express';
import productController from '../controllers/product-controller.js'
import authMiddleware from '../middlewares/auth-middleware.js';

// Instanciando o router do express
const router = express.Router();

// Definindo conexão das rotas com as responsabilidades do controller de product
router.route("/")
.get( authMiddleware,productController.getAll) 
.post( authMiddleware, productController.create) 

router.route("/:code")
.get( authMiddleware, productController.getOne) 
.delete( authMiddleware, productController.deleteOne) 
.put( authMiddleware, productController.updateOne) 

export default router;