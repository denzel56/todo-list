import React from 'react';
import PropTypes from 'prop-types';
import s from './Input.module.css';


const Input = ({ type, name, placeholder, defaultValue, onChange }) => {
  const handleChange = (e) => {
    localStorage.setItem(e.target.name.toString(), e.target.value);
    if (onChange) {
      onChange();
    }
  }

  return (
    <div className={s.root}>
      <label htmlFor={`${name}`}>
        <input className={s.input}
          type={type}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      </label>
    </div>
  )};

Input.defaultProps = {
  type: "text",
  name: "text",
  placeholder: "Введите текст",
  defaultValue: "",
  onChange: null
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func
}

export default Input;
