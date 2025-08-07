// Exporta a função assíncrona que irá lidar com o corpo JSON da requisição
export async function jsonBodyHandler(request, response) {
    // Inicializa um array para armazenar os pedaços (chunks) da requisição
    const buffers = []

    // Coleta os dados do corpo da requisição, que podem chegar em partes (stream)
    for await (const chunk of request) {
        buffers.push(chunk) // Adiciona cada pedaço ao array
    }

    try {
        // Concatena todos os pedaços e converte o buffer para string
        // Em seguida, tenta converter a string para um objeto JavaScript (parse do JSON)
        request.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch (erro) {
        // Se der erro ao fazer o parse (JSON malformado), define o corpo como null
        request.body = null
    }

    // Define o cabeçalho da resposta como JSON, para manter o padrão de resposta
    response.setHeader("Content-Type", "application/json")
}
