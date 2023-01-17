import s from './Input.module.css';
import PropTypes from 'prop-types';

/**
 * Компонент input
 * @param { string } type Тип поля ввода(input)
 * @param { string } name Имя поля ввода
 * @param { string } placeholder Плейсхолдер поля ввода
 * @param { string } defaultValue Значение поля по умолчанию
 * @returns поле ввода
 */
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
  /**
   * Тип поля ввода
   */
  type: PropTypes.string,
  /**
   * Имя поля ввода
   */
  name: PropTypes.string,
  /**
   * Плейсхолдер поля ввода
   */
  placeholder: PropTypes.string,
  /**
   * Значение по умолчанию поля ввода
   */
  defaultValue: PropTypes.string
}

export default Input;
