import { Router } from "express";
import { getStore} from "../controllers/storeController";


//////////////////////// ROUTES ////////////////////////

const router = Router(); 

router.get('/', getStore);

export default router 