import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css'

import Input from "../../components/Input";
import Header from "../../components/Header";

import auth from "../../database/firebase";

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
  const navigate = useNavigate();


  const handleChange = () => {
    setForm({
      email: localStorage.getItem('email'),
      password: localStorage.getItem('password'),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const {email, password} = form;

    if (form.password.length < 6) {
      NotificationManager.success('пароль дожен содержать не меньше 6 симвоов', 'Warning')
      return
    }


    if (ref.current.name === 'Register') {
      const credential = EmailAuthProvider.credential(email, password);
      linkWithCredential(auth.currentUser, credential)
      .then(() => {
        NotificationManager.success('Anonymous account successfully upgraded', 'Sucess');
        navigate('/');
      }).catch(() => {

        NotificationManager.error('Error upgrading anonymous account', 'Error')
      });
    }

    if (ref.current.name === 'Login') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Signed in
          NotificationManager.success('Sucess');
          navigate('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          NotificationManager.error(errorMessage, 'Error')
        });
    }


    localStorage.removeItem('email');
    localStorage.removeItem('password');

    setForm({
      email: '',
      password: '',
    })

    ref.current.reset();
  }

  return (
    <>
      <Header />
      <NotificationContainer />
      <div className={s.root}>
        {
          isLogin ? <h1>Login</h1> : <h1>Register</h1>
        }
        <form
          onSubmit={handleSubmit}
          ref={ref}
          name={isLogin ? 'Login' : 'Register'}
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
    </>
  )
}

export default AuthPage;
