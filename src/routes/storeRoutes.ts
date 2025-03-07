import { Router } from "express";
import { createStore, getStore, updateStore} from "../controllers/storeController";


//////////////////////// ROUTES ////////////////////////

const router = Router(); // Por padrão de escrita, interessante mudar o nome para router

export default router 