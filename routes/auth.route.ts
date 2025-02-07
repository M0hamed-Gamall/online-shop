import { Router } from "express";
import { getsigup , getlogin, postsignup  , postlogin , logout} from "../controllers/auth.controller";
import { signupvalidate } from "../validators/signup.validator"
import { isNotUser , isUser } from '../middlewares/userInfo'

const router = Router();

router.get('/signup' , isNotUser ,getsigup )
router.post('/signup' ,signupvalidate , postsignup)
router.get('/login' , isNotUser , getlogin)
router.post('/login' , isNotUser , postlogin)
router.get('/logout' , isUser ,logout)


export default router;