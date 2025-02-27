# Desafio 2 - Desenvolvendo uma Physical Store

-> O projeto é a criação de um Physical Store que irá conter as lojas de uma determinada loja eCommerce.  

- Para isso será utilizada a API do ViaCEP (https://viacep.com.br/) ao qual irá trazer as 
informações de endereço das lojas. 

- Utilizarei aqui (numero de lojas ainda a definir) lojas.

- O usuário deverá localizar as lojas físicas presentes em um raio de 100km através da busca 
pelo CEP. Devendo retornar como prioridade na lista, a loja mais próxima ao CEP digitado. 

- Retornar caso não tenha nenhuma loja próxima ao CEP digitado, com mensagem 
informativa.  

- Trazer as informações da loja física de forma organizada (Nome da Loja, Rua, Número ...)

- Não será criado um Front, a aplicação irá rodar por meio do terminal. 

- Implemantar a geração dos logs, com a utilização do Winston para a geração dos 
logs em formato json.