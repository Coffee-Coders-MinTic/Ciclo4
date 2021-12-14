import React from 'react';

const Textarea = ({ label, name, defaultValue, required, disabled }) => {
    return (
        <label htmlFor={name} className='flex flex-col my-3'>
            <span>{label}</span>
            <textarea
                required={required}
                name={name}
                className='input resize-none rounded-md'
                cols="50"
                rows="4"
                disabled={disabled}
                defaultValue={defaultValue}
            />
        </label>
    );
};

export default Textarea;