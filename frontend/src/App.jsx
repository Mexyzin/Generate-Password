import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; 

// componentes
import PasswordDisplay from './components/PasswordDisplay';
import PasswordStrength from './components/PasswordStrength';
import PasswordOptions from './components/PasswordOptions';
import PasswordHistory from './components/PasswordHistory';


import { generatePasswordAPI, getHistoryAPI } from './services/api';
import { checkStrength } from './utils/strengthChecker';

// Função auxiliar para obter ou criar um ID único para o dispositivo/navegador.
// Ela fica fora do componente para não ser recriada a cada renderização.
function getDeviceId() {
    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = uuidv4();  // Gera UUID com a lib uuid, compatível em todos browsers
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function App() {
    const [password, setPassword] = useState('Clique em gerar senha');
    const [options, setOptions] = useState({
        length: 16,
        includeUppercase: true,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        customChars: '',
    });
    const [history, setHistory] = useState([]);
    const [strength, setStrength] = useState({});
    const [isCustom, setIsCustom] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deviceId, setDeviceId] = useState('');

    // Efeito que roda UMA VEZ quando o componente é montado para definir o deviceId
    useEffect(() => {
        const id = getDeviceId();
        setDeviceId(id);
        fetchHistory(id); // Busca o histórico inicial para este dispositivo
    }, []); // O array de dependências vazio garante que este efeito rode apenas uma vez

    const fetchHistory = useCallback(async (id) => {
        if (!id) return; // Não busca se o ID ainda não estiver definido
        try {
            const response = await getHistoryAPI(id);
            setHistory(response.data);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            setHistory([]); // Limpa o histórico em caso de erro
        }
    }, []);

    const handleGeneratePassword = async () => {
        if (!deviceId) return; // Impede a geração se o ID não estiver pronto
        
        setIsLoading(true);
        try {
            const finalOptions = isCustom ? options : { ...options, customChars: '' };
            // Passa tanto as opções quanto o ID do dispositivo para a API
            const response = await generatePasswordAPI({ options: finalOptions, deviceId });
            setPassword(response.data.password);
            fetchHistory(deviceId); // Atualiza o histórico para o dispositivo atual
        } catch (error) {
            console.error('Erro ao gerar senha:', error);
            setPassword('Erro ao gerar');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOptionChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOptions(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Efeito que observa mudanças na senha para recalcular a força
    useEffect(() => {
        setStrength(checkStrength(password));
    }, [password]);

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-mono p-4">
            <div className="w-full max-w-4xl bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center mb-6 text-green-400 font-bold">
                    Gerador de Senha Seguro
                </h1>
                
                <PasswordDisplay password={password} />
                <PasswordStrength strength={strength} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <PasswordOptions 
                        options={options} 
                        handleOptionChange={handleOptionChange}
                        isCustom={isCustom}
                        setIsCustom={setIsCustom}
                    />
                    <PasswordHistory history={history} />
                </div>

                <button 
                    onClick={handleGeneratePassword} 
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded mt-8 text-lg md:text-xl transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Gerando...' : 'Gerar Senha'}
                </button>
            </div>
        </div>
    );
}

export default App;