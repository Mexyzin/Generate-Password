const express = require('express');
const cors = require('cors');
const passwordRoutes = require('./routes/passwordRoutes');

require('dotenv').config(); 

// Inicializa o banco de dados (aqui a instância Singleton é criada pela primeira vez)
require('./config/database');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors()); // Habilita o CORS para que o front-end (em outra porta) possa fazer requisições
app.use(express.json()); // Habilita o servidor a entender requisições com corpo em JSON

// Rota principal da API
app.use('/api/password', passwordRoutes);


app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
    console.log(`Conectado com sucesso!`);
});