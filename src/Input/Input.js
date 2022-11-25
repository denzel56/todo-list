import s from './Input.module.css';
import PropTypes from 'prop-types';

const Input = ({ type, name, placeholder, defaultValue }) => {
  return (
    <div className={s.root}>
      <input className={s.input}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string
}

export default Input;
