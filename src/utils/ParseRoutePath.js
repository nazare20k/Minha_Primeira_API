// Função que converte uma rota com parâmetros dinâmicos em uma expressão regular
export function parseRoutePath(path) {
  // Expressão regular que identifica parâmetros de rota no formato ":param"
  const routeParametersRegex = /:([a-zA-Z]+)/g

  // Substitui os parâmetros por grupos nomeados que aceitam letras, números, hífens, underlines e pontos
  // Exemplo: /user/:id -> /user/(?<id>[a-z0-9-_.]+)
  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_.]+)")

  // Cria a expressão regular final, incluindo um grupo opcional para capturar a query string (?chave=valor...)
  // O grupo "query" captura tudo que vier após o '?', se existir
  const pathRegex = new RegExp(`^${params}(?<query>\\?.*)?$`)

  // Retorna a expressão regular gerada
  return pathRegex
}
