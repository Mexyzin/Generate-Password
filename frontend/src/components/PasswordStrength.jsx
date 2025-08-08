import React from 'react';

function PasswordStrength({ strength }) {
  const { score = -1, text = '', color = 'bg-gray-200' } = strength;
  const barWidth = score === -1 ? '0%' : `${(score + 1) * 20}%`;

  return (
    <div className="mb-6">
      <div className="w-full h-2 bg-gray-700 rounded">
        <div 
          className={`h-full rounded transition-all duration-300 ${color}`} 
          style={{ width: barWidth }}
        ></div>
      </div>
      <p className="text-right text-sm mt-1 text-gray-300">
        {text}
      </p>
    </div>
  );
}

export default PasswordStrength;