//////// realizando busca por coordenadas utilizando o Nominatim /////////
import axios from "axios";

interface Location {
  lat: number;
  lon: number;
}

/**
 * @param cep 
 * @returns  ////// Retornar um objeto, junto com sua latitude e longitude. ////////
*/
export const getCoordinatesByCep = async (cep: string): Promise<Location | null> => {
  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: { q: cep, format: "json", countrycodes: "BR", addressdetails: 1 },
    });

    if (response.data.length === 0) return null;

    const { lat, lon } = response.data[0];
    return { lat: parseFloat(lat), lon: parseFloat(lon) };
  } catch (error) {
    console.error("Erro ao buscar coordenadas:", error);
    return null;
  }
};
