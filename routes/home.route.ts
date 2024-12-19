import { Router } from "express";
import {gethome} from '../controllers/home.controller'

const router = Router();

router.get('/' , gethome);

export default router;