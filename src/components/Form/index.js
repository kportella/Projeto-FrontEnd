import React from 'react'
import './Form.css';

function Form({ type, name, value, onChange }) {
    return (
        <div>
            <input name={name}
                type={type}
                value={value}
                onChange={onChange} />
        </div>
    )
}

export default Form;
