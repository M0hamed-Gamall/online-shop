import { Router } from "express";
import { signup , validateUser } from "../controllers/auth.controller";

const router = Router();

router.get('/signup' , (req,res,next)=>{
    // console.log(res.locals)
    // console.log(req.flash("errors"))
    res.render('signup');
})
router.post('/signup' ,validateUser ,signup)


export default router;