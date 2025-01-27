import { Router } from "express";
import { getsigup , getlogin, postsignup  , postlogin} from "../controllers/auth.controller";
import { signupvalidate } from "../validators/signup.validator"

const router = Router();

router.get('/signup' , getsigup )
router.post('/signup' ,signupvalidate ,postsignup)
router.get('/login' , getlogin)
router.post('/login' ,postlogin)


export default router;