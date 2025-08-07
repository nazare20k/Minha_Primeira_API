// Exporta um array com as rotas da aplicação
import { parseRoutePath } from "./utils/ParseRoutePath.js";
export const routes = [
  {
    // Define a rota GET /products
    method: "GET",
    path: "/products",

    controller: ({ request, response, database }) => {
      const products = database.select("products");
      console.log(products);
      // Quando essa rota for chamada, retorna uma mensagem simples
      return response.end(JSON.stringify(products));
    },
  },

  {
    // Define a rota POST /products
    method: "POST",
    path: "/products",
    controller: ({ request, response, database }) => {
      const { name, price } = request.body;
      database.insert("products", { name, price });

      return response.writeHead(201).end();

      // Quando essa rota for chamada, retorna o corpo da requisição como JSON
      // e responde com o status 201 (Criado)
    },
  },

  {
    // Define a rota POST /products
    method: "DELETE",
    path: "/products/:id",
    controller: ({ request, response }) => {
      // Quando essa rota for chamada, retorna o corpo da requisição como JSON
      // e responde com o status 201 (Criado)
      return response.end(request.params.id);
    },
  },
].map((route) => ({
  ...route,
  path: parseRoutePath(route.path),
}));
