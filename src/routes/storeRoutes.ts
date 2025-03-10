import { Router } from "express";
import { getStores} from "../controllers/storeController";

//////////////////////// ROUTES ////////////////////////

const router = Router(); 

router.get('/stores/:cep', getStores);

export default router;