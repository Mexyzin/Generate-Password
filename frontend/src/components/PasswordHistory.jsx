import React from 'react';

function PasswordHistory({ history }) {
  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <h2 className="text-xl mb-2 text-green-400">Histórico Recente</h2>
      <div className="bg-gray-700 p-3 rounded h-48 overflow-y-auto">
        {history && history.length > 0 ? (
          history.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm mb-1 p-1 hover:bg-gray-600 rounded">
              <span className="truncate pr-4">{item.password}</span>
              <span className="text-gray-400 flex-shrink-0">{formatDate(item.createdAt)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center pt-16">Nenhum histórico encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default PasswordHistory;