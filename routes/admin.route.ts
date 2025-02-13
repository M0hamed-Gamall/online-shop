import { Router } from "express";
import { isAdmin } from "../middlewares/userInfo";
import { getAddProduct , postAddProduct , getMangeOrders , postMangeOrders } from '../controllers/admin.controller'
import multer from 'multer'
import { productValidator } from "../validators/product.validator"

const router = Router();

router.get('/add-product' , isAdmin , getAddProduct )

router.post('/add-product' , isAdmin , multer({
    storage: multer.diskStorage({
        destination: (req , file , cb)=>{
            cb(null , 'images')
        },
        filename: (req , file , cb)=>{
            cb(null , Date.now() + '_' + file.originalname)
        }
    })
}).single('image') , productValidator , postAddProduct )

router.get('/manage-orders' , isAdmin , getMangeOrders)
router.post('/manage-orders' , isAdmin , postMangeOrders)

export default router;