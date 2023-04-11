import React from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Link, useLocation} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import auth from '../../database/firebase';

import s from './Header.module.css';

const Header = () => {
  const location = useLocation();

  const handleClickOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      NotificationManager.success('','Sucess');
      localStorage.removeItem('todoUid');
      window.location.reload();
    }).catch((error) => {
      // An error happened.
      const errorMessage = error.message;
      NotificationManager.error(errorMessage, 'Error');
    });
  }


  const anonumousCheck = () => {
    if (auth && auth.currentUser) {
      if (!auth.currentUser.isAnonymous) {
        return (
          <Link to='/' onClick={handleClickOut} >Выйти</Link>
        )
      }
    }

    return (
      location.pathname === '/auth' ?
      <Link to='/' className={s.link}>Назад</Link> :
      <Link to='/auth' className={s.link}>Вход / Регистрация</Link>
    )
  }

  return (
    <>
      <div className={s.root}>
        {
          anonumousCheck()
        }
      </div>
      <NotificationContainer />
    </>
  );
}
export default Header;
