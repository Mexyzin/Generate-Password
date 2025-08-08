const PasswordFactory = require('../patterns/PasswordFactory');
const dbSingleton = require('../config/database');
const { encrypt, decrypt } = require('../utils/cipher');
const db = dbSingleton.getDb();

exports.generatePassword = (req, res) => {
    try {
     
        const { options, deviceId } = req.body; 

        if (!deviceId) {
            return res.status(400).json({ error: 'ID do dispositivo é obrigatório.' });
        }
        if (!options || !options.length || options.length <= 0) {
            return res.status(400).json({ error: 'Opções de senha inválidas.' });
        }

        const rawPassword = PasswordFactory.create(options);
        const encryptedPassword = encrypt(rawPassword); // Criptografa a senha
        const createdAt = new Date().toISOString();

        const stmt = db.prepare("INSERT INTO history (password, deviceId, createdAt) VALUES (?, ?, ?)");
        stmt.run(encryptedPassword, deviceId, createdAt);
        stmt.finalize();

        // Retorna a senha não criptografada para o usuário ver
        res.status(201).json({ password: rawPassword, createdAt });

    } catch (error) {
        console.error("Erro no controller:", error.message);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
};

exports.getHistory = (req, res) => {
    // O deviceId agora vem como um parâmetro da URL
    const { deviceId } = req.params; 

    if (!deviceId) {
        return res.status(400).json({ error: 'ID do dispositivo é obrigatório.' });
    }

    const sql = "SELECT password, createdAt FROM history WHERE deviceId = ? ORDER BY id DESC LIMIT 20";
    db.all(sql, [deviceId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        // Descriptografa cada senha antes de enviar para o front-end
        const decryptedHistory = rows.map(item => ({
            ...item,
            password: decrypt(item.password)
        })).filter(item => item.password !== null); // Filtra senhas que falharam na descriptografia

        res.json(decryptedHistory);
    });
};