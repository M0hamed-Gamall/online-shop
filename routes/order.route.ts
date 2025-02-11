import { Router } from "express";
import { getorders , postorders} from "../controllers/order.controller";

const router = Router();

router.get('/' , getorders)
router.post('/' , postorders)

export default router;