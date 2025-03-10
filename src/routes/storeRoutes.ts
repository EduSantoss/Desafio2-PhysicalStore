import { Router } from "express";
import { validateCep, getStores, extractRadius} from "../controllers/storeController";

//////////////////////// ROUTES ////////////////////////

const router = Router(); 

router.route('/:cep').get(validateCep, extractRadius, getStores );

export default router;