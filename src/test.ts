import { getAddressByCep } from "./services/viaCepService";

const testCep = async () => {
  const cep = "54410-359"; // Exemplo de CEP válido
  const address = await getAddressByCep(cep);

  if (address) {
    console.log("Endereço encontrado:", address);
  } else {
    console.log("CEP não encontrado!");
  }
};

testCep();
