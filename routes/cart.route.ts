import { Router } from "express";
import { isUser } from "../middlewares/userInfo";
import { getcart , postcart , deleteCartItem} from "../controllers/cart.controller";

const router = Router();

router.get('/' , isUser, getcart)
router.post('/' , isUser , postcart)
router.post('/delete' , isUser , deleteCartItem)

export default router;
