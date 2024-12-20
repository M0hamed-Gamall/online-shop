import { Router } from "express";
import { signup } from "../controllers/auth.controller";

const router = Router();

router.get('/signup' , (req,res,next)=>{
    res.render('signup');
})
router.post('/signup' , signup)


export default router;