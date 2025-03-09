import axios from "axios";

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean; 
}

/**

  @param cep 
  @returns 
 */
export const getAddressByCep = async (cep: string): Promise<CepResponse | null> => {
  try {
    const response = await axios.get<CepResponse>(`https://viacep.com.br/ws/${cep}/json/`);
    
    if (response.data.erro) {
      console.error("❌ CEP inválido!");
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar CEP:", error);
    return null;
  }
};
