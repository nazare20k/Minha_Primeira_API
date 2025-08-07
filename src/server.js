// Importa o módulo HTTP nativo do Node.js, usado para criar o servidor
import http from "node:http"

// Importa o middleware responsável por tratar o corpo da requisição JSON
import { jsonBodyHandler } from "./middlewares/jsonBodyHandler.js"

// Importa o middleware responsável por lidar com as rotas da aplicação
import { routeHandler } from "./middlewares/routeHandler.js"

// Cria o servidor HTTP
const server = http.createServer(async (request, response) => {
  // Aguarda o middleware que lê e converte o corpo da requisição JSON
  await jsonBodyHandler(request, response)

  // Chama o middleware que trata a rota com base na URL e no método HTTP
  routeHandler(request, response)
})

// Faz o servidor escutar na porta 3333 (localhost:3333)
server.listen(3333)
