import { RequestHandler } from "express";
import Store from "../models/storeModel";
import { getCoordinatesByCep } from "../services/locationService";

const EARTH_RADIUS_KM = 6371;
// TESTAR RADIUS PARA VER SE FUNCIONA, E CEP ERRADO, E NOME DIFERENTE DE LOJAS, BUSCA PELO NOME
/**
 * ////////// Middleware para buscar as lojas, utilizando a formula de haversine. ///////////
 */
export const getStores: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { cep } = req.params;
    const radius = Number(req.query.radius) || 100;

    const userLocation = await getCoordinatesByCep(cep);
    if (!userLocation) {
      res.status(400).json({ message: "CEP inválido ou não encontrado" });
      return; 
    }

    const stores = await Store.find();

    const storesWithinRadius = stores
      .map((store) => {
        const distance = haversineDistance(
          userLocation.lat,
          userLocation.lon,
          store.latitude,
          store.longitude
        );

        return { ...store.toObject(), distance };
      })
      .filter((store) => store.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    if (storesWithinRadius.length === 0) {
      res.status(404).json({ message: "Nenhuma loja encontrada no raio especificado" });
      return;
    }

    res.json(storesWithinRadius);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar lojas"});
  }
};

//////  Middleware para extrair o raio da URL ///////////
export const extractRadius: RequestHandler = (req, _res, next) => {
  const radius = req.query.radius as string;
  
  if (radius) {
    req.query.radius = radius; 
  } else {
    req.query.radius = '100'; 
  }
  next();
};

 ///////////////  Formula de haversine ////////////////
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (angle: number) => (Math.PI * angle) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
};
