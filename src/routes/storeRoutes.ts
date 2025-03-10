import { Router } from "express";
import { getStores, extractRadius} from "../controllers/storeController";

//////////////////////// ROUTES ////////////////////////

const router = Router(); 

router.route('/:cep').get(extractRadius, getStores );

export default router;