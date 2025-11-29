import express from 'express';
import promotionController from '../controllers/promotion-controller.js'

const router = express.Router();
router.route("/")
.get()
.post()

router.route("/:id")
.get()
.delete()
.put()

export default router;