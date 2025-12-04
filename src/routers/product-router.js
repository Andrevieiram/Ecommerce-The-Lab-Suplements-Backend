
import express from 'express';
import productController from '../controllers/product-controller.js'

const router = express.Router();

router.route("/")
.get(productController.getAll) 
.post(productController.create) 

router.route("/:id")
.get(productController.getOne) 
.delete(productController.deleteOne) 
.put(productController.updateOne) 

router.route("/login")
.post(productController.login)

export default router;