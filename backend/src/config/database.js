const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Caminho para o arquivo do banco de dados (será criado na raiz da pasta 'backend')
const DB_PATH = path.join(__dirname, '..', '..', 'database.sqlite');

/**
 * Padrão Singleton: Garante que só teremos uma instância da classe Database.
 * Isso evita múltiplas conexões com o banco de dados, economizando recursos.
 */
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }

        this.db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('Erro ao conectar ao SQLite:', err.message);
                throw err;
            } else {
                console.log('Conectado ao banco de dados SQLite.');
                this.init();
            }
        });

        Database.instance = this;
    }

    // init() cria a tabela de histórico se ela ainda não existir.
    init() {
        const sql = `
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                password TEXT NOT NULL,
                deviceId TEXT NOT NULL, 
                createdAt TEXT NOT NULL
            )
        `;
        this.db.run(sql);
    }

    // Método para obter a conexão ativa com o banco
    getDb() {
        return this.db;
    }
}

// Exportamos a instância já criada e "congelada" para que não possa ser alterada.
const instance = new Database();
Object.freeze(instance);

module.exports = instance;