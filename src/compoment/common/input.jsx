import React, { Component } from 'react';

class Input extends Component {
    render() { 
        const {name, label, value, onChange, placeholder, type, error} = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <input 
                    value={value}
                    onChange={onChange}
                    type={type}
                    className="form-control my-2" 
                    id={name} 
                    name={name}
                    placeholder={placeholder}
                />
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
    );}
}

export default Input;