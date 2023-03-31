import React, { useRef, useState } from "react";
import Input from "../../components/Input";

import s from './AuthPage.module.css';

const AuthPage = () => {
  // eslint-disable-next-line
  const [isLogin, setLogin] = useState(true);
  const [form, setForm] = useState(
    {
      email: '',
      password: ''
    })

  const ref = useRef(null);

  const handleChange = () => {
    setForm({
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('send', form);


    localStorage.removeItem('email');
    localStorage.removeItem('password');

    setForm({
      email: '',
      password: '',
    })

    ref.current.reset();
  }

  return (
    <div className={s.root}>
      {
        isLogin ? <h1>Login</h1> : <h1>Register</h1>
      }
      <form
        onSubmit={handleSubmit}
        ref={ref}
        name={isLogin ? 'Login' : 'Reister'}
      >
        <div className={s.inputWrap}>
          <Input
            type="email"
            name="email"
            placeholder="Введите логин"
            defaultValue={form.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Укажите пароль"
            defaultValue={form.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className={s.authButton}
          >
            {isLogin ? 'Signin' : 'Signup'}
          </button>
          <a href='s#'
            className={s.regLink}
            onClick={(e) => {
              e.preventDefault();
              setLogin(!isLogin);
            }}
          >
            {
              isLogin ? 'Register' : 'Login'
            }
          </a>
        </div>
      </form>
    </div>
  )
}

export default AuthPage;
