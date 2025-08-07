// Importa o módulo 'fs' (file system) usando a versão com Promises do Node.js
import fs from "node:fs/promises"

// Define o caminho do arquivo do banco de dados (db.json) baseado no local deste script
const DATABASE_PATH = new URL("db.json", import.meta.url)

// Classe Database para manipular dados armazenados em arquivo JSON
export class Database {
    // Propriedade privada (#) que guarda os dados carregados do arquivo
    #database = {}

    // Construtor: executa assim que a classe é instanciada
    constructor() {
        // Tenta ler o arquivo de banco de dados
        fs.readFile(DATABASE_PATH, "utf8")
            .then((data) => {
                // Se conseguir ler, converte o conteúdo JSON para objeto e armazena em #database
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                // Se o arquivo não existir ou der erro, cria um novo arquivo vazio
                this.#persist()
            })
    }

    // Método privado para salvar (persistir) os dados atuais no arquivo JSON
    #persist() {
        fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
    }

    // Método para inserir dados em uma "tabela" (array dentro do JSON)
    insert(table, data) {
        // Se a tabela já existe e é um array, adiciona o novo dado
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            // Caso contrário, cria a tabela como um array com o dado inicial
            this.#database[table] = [data]
        }

        // Salva as alterações no arquivo
        this.#persist()
    }

    // Método para buscar dados de uma "tabela"
    select(table) {
        // Retorna a tabela ou um array vazio caso ela não exista
        return this.#database[table] ?? []
    }
}

/**
 * Estrutura inicial do arquivo db.json:
{
  "products": [],
  "users": []
}
 */
