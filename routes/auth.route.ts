import { Router } from "express";
import { signup , validateUser } from "../controllers/auth.controller";

const router = Router();

router.get('/signup' , (req,res,next)=>{
    res.render('signup');
})
router.post('/signup' ,validateUser ,signup)


export default router;