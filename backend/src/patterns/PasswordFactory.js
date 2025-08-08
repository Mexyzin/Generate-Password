// Uma classe base para o gerador
class PasswordGenerator {
    generate(length, charSet) {
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            password += charSet[randomIndex];
        }
        return password;
    }
}

/**
 * Padrão Factory Method: A classe PasswordFactory decide qual conjunto de 
 * caracteres usar com base nas 'options' e cria o produto final (a senha).
 * Se novas regras de senha forem necessárias no futuro, só precisamos modificar esta fábrica.
 */
class PasswordFactory {
    static create(options) {
        const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, customChars } = options;

        // Se a opção 'customChars' for fornecida, ela tem prioridade.
        if (customChars && customChars.length > 0) {
            return new PasswordGenerator().generate(length, customChars);
        }

        // Caso contrário, monta o conjunto de caracteres com base nas opções padrão.
        let charSet = '';
        if (includeLowercase) charSet += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charSet += '0123456789';
        if (includeSymbols) charSet += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        // Garante que não gere uma senha vazia se nenhuma opção for marcada
        if (charSet.length === 0) {
            throw new Error('Nenhum conjunto de caracteres selecionado para gerar a senha.');
        }

        return new PasswordGenerator().generate(length, charSet);
    }
}

module.exports = PasswordFactory;