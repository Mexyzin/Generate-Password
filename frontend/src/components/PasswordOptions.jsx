import React from 'react';

function PasswordOptions({ options, handleOptionChange, isCustom, setIsCustom }) {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2">Tamanho da Senha: <span className="text-green-400 font-bold">{options.length}</span></label>
        <input 
          type="range" 
          name="length" 
          min="6" 
          max="64" 
          value={options.length} 
          onChange={handleOptionChange} 
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
        />
      </div>

      <div className="mt-4">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" name="isCustom" checked={isCustom} onChange={() => setIsCustom(!isCustom)} className="form-checkbox h-5 w-5 text-green-500 rounded bg-gray-700 border-gray-600"/>
          <span className="ml-2">Usar caracteres personalizados</span>
        </label>
      </div>

      {isCustom ? (
        <div className="mt-2">
          <label htmlFor="customChars" className="block mb-1">Caracteres Permitidos</label>
          <input 
            id="customChars"
            type="text" 
            name="customChars" 
            value={options.customChars} 
            onChange={handleOptionChange} 
            className="w-full bg-gray-700 p-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500" 
            placeholder="ex: abc_123*"/>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <OptionCheckbox name="includeUppercase" checked={options.includeUppercase} onChange={handleOptionChange} label="Maiúsculas (A-Z)" />
          <OptionCheckbox name="includeLowercase" checked={options.includeLowercase} onChange={handleOptionChange} label="Minúsculas (a-z)" />
          <OptionCheckbox name="includeNumbers" checked={options.includeNumbers} onChange={handleOptionChange} label="Números (0-9)" />
          <OptionCheckbox name="includeSymbols" checked={options.includeSymbols} onChange={handleOptionChange} label="Símbolos (!@#$)" />
        </div>
      )}
    </div>
  );
}

const OptionCheckbox = ({ name, checked, onChange, label }) => (
  <label className="flex items-center cursor-pointer">
    <input type="checkbox" name={name} checked={checked} onChange={onChange} className="form-checkbox h-5 w-5 text-green-500 rounded bg-gray-700 border-gray-600"/>
    <span className="ml-2">{label}</span>
  </label>
);

export default PasswordOptions;