import { RequestHandler } from "express";
//import { Store } from "../models/storeModel";


export const getStore: RequestHandler = async (req, res) => {
    try {
       // const stores = await Store.find();  // preciso verificar erro do store
       // res.status(200).json(stores);
      } catch (error) {
        console.error("Erro ao buscar lojas:", error);
        res.status(500).json({ message: "Erro interno no servidor" });
      }
}

// exports.checkRadius = (req, res, next, val)
 
