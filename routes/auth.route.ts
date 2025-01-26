import { Router } from "express";
import { postsignup  } from "../controllers/auth.controller";
import { validateUser } from "../validators/signup.validator"

const router = Router();

router.get('/signup' , (req,res,next)=>{
    res.render('signup');
})
router.post('/signup' ,validateUser ,postsignup)


export default router;