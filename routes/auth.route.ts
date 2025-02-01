import { Router } from "express";
import { getsigup , getlogin, postsignup  , postlogin , logout} from "../controllers/auth.controller";
import { signupvalidate } from "../validators/signup.validator"
import { isUser } from '../middlewares/userInfo'

const router = Router();

router.get('/signup' , isUser ,getsigup )
router.post('/signup' ,signupvalidate , postsignup)
router.get('/login' , isUser , getlogin)
router.post('/login' , isUser , postlogin)
router.get('/logout' , logout)


export default router;