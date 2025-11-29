import express from 'express';
import productController from '../controllers/product-controller.js'

const router = express.Router();
router.route("/")
.get()
.post()

router.route("/:id")
.get()
.delete()
.put()

export default router;