const crypto = require('crypto');
require('dotenv').config();

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex'); // A chave deve ter 32 bytes (64 hex chars)
const IV_LENGTH = 16; // Para AES-GCM, o IV recomendado é de 12 bytes, mas 16 também é comum
const AUTH_TAG_LENGTH = 16;

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    
    // Concatena IV, AuthTag e o texto criptografado para salvar no DB
    return Buffer.concat([iv, authTag, encrypted]).toString('hex');
}

function decrypt(encryptedText) {
    const buffer = Buffer.from(encryptedText, 'hex');
    const iv = buffer.slice(0, IV_LENGTH);
    const authTag = buffer.slice(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = buffer.slice(IV_LENGTH + AUTH_TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);

    try {
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    } catch (error) {
        console.error("Erro ao descriptografar:", error.message);
        // Retorna um valor padrão ou nulo se a descriptografia falhar
        return null; 
    }
}

module.exports = { encrypt, decrypt };