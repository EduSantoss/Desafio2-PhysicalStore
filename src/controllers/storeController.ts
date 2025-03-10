import { RequestHandler } from "express";
import Store from "../models/storeModel";
import { getCoordinatesByCep } from "../services/locationService";
import logger from "../services/logger";

const EARTH_RADIUS_KM = 6371;


////////// Middleware para buscar as lojas, utilizando a formula de haversine. ///////////
export const getStores: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { cep } = req.params;
    const radius = Number(req.query.radius) || 100;

    const userLocation = await getCoordinatesByCep(cep);
    if (!userLocation) {
      logger.error(`CEP não encontrado: ${cep}`);
      res.status(400).json({ message: "CEP não encontrado." });
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
      logger.warn(`Nenhuma loja encontrada dentro do raio de ${radius}km para o CEP ${cep}`);
      res.status(404).json({ message: "Nenhuma loja encontrada dentro do raio especificado" });
      return;
    }
    logger.info(`Foram encontradas ${storesWithinRadius.length} lojas dentro do raio de ${radius}km para o CEP ${cep}`);
    res.json(storesWithinRadius);
    return;
  } catch (error) {
    logger.error(`Erro ao buscar lojas: ${(error as Error).message}`);
    res.status(500).json({ message: "Erro ao buscar lojas"});
    return;
  }
};

/////// Middleware para validar o CEP ////////////
export const validateCep: RequestHandler = (req, res, next) => {
  const { cep } = req.params;

  if (!/^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
    logger.error(`O CEP informado é inválido:${cep}`)
    res.status(400).json({ message: 'CEP inválido. O formato deve ser 00000-000 ou 00000000.' });
    return
  }

  next();
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
