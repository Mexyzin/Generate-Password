import zxcvbn from 'zxcvbn';

export const checkStrength = (password) => {
   
    if (!password || password === 'Clique em gerar senha') return { score: -1, text: '', color: 'bg-gray-200' };

    const result = zxcvbn(password);
    const score = result.score; // Pontuação de 0 (fraca) a 4 (forte)

    const textMap = ['Muito Fraca', 'Fraca', 'Razoável', 'Forte', 'Muito Forte'];
    const colorMap = [
        'bg-red-500',
        'bg-orange-500',
        'bg-yellow-500',
        'bg-blue-500',
        'bg-green-500'
    ];

    return {
        score,
        text: textMap[score],
        color: colorMap[score],
    };
};