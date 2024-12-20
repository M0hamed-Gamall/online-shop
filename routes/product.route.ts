import { Router } from "express";
import { getproduct } from '../controllers/product.controller'

const router = Router();

router.get('/:id' ,getproduct )

export default router