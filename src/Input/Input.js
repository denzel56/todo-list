import s from './Input.module.css';

const Input = ({ type, name }) => {
  return (
    <div className={s.root}>
      <input className={s.input}
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
