import React from 'react';

const Input = ({ label, name, defaultValue, type, required, disabled }) => {
  return (
    <label htmlFor={name} className='flex flex-col my-3 md:w-1/3'>
      <span>{label}</span>
      <input
        required={required}
        type={type}
        name={name}
        className='input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
        disabled={disabled}
        defaultValue={defaultValue}
      />
    </label>
  );
};

export default Input;
