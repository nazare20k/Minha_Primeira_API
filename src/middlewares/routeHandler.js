// Importa o array de rotas definidas no arquivo routes.js
import { routes } from "../routes.js";
import { extractQueryParams } from "../utils/extract-query-params.js";
import { Database } from "../database.js";

const database = new Database();
//database. = []
// Função responsável por lidar com as rotas
export function routeHandler(request, response) {
  // Procura dentro do array de rotas uma que tenha o mesmo método e caminho da requisição
  const route = routes.find((route) => {
    return route.method === request.method && route.path.test(request.url);
  });

  // Se encontrou uma rota compatível
  if (route) {
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};

    // Chama o controller da rota, passando a requisição e a resposta
    return route.controller({ request, response, database });
  }

  // Se nenhuma rota foi encontrada, responde com status 404 e mensagem de erro
  return response.writeHead(404).end("Rota não encontrada!");
}
