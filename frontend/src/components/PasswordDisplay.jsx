import React from 'react';

function PasswordDisplay({ password }) {
  const handleCopy = () => {
    if (password && password !== 'Clique em gerar senha') {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(password)
          .then(() => alert('Senha copiada para a área de transferência!'))
          .catch(err => {
            console.error('Falha ao copiar a senha: ', err);
            alert('Não foi possível copiar a senha.');
          });
      } else {
        // Fallback usando execCommand (funciona em muitos browsers antigos)
        const textArea = document.createElement('textarea');
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();

        try {
          if (document.execCommand('copy')) {
            alert('Senha copiada para a área de transferência!');
          } else {
            alert('Não foi possível copiar a senha.');
          }
        } catch (err) {
          alert('Não foi possível copiar a senha.');
          console.error('Erro no fallback de copiar:', err);
        }

        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded mb-4 flex justify-between items-center">
      <span className="text-xl break-all font-semibold">
        {password}
      </span>
      <button 
        onClick={handleCopy} 
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-bold transition-colors duration-200"
      >
        Copiar
      </button>
    </div>
  );
}

export default PasswordDisplay;
