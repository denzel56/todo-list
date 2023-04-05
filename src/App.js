import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import auth from './database/firebase';

import MainPage from './pages/MainPage';

import './App.css';
import AuthPage from './pages/AuthPage';

const App = () => {
  useEffect(() => {
      signInAnonymously(auth)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
           // eslint-disable-next-line
          console.log(errorCode,errorMessage)
        });
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const { uid }= user;
            localStorage.setItem('todoUid', uid);
          } else {
            // User is signed out
            // ...
          }
        })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route index element={<MainPage />} />
        <Route path='auth' element={<AuthPage />} />
      </Routes>
    </div>
  )
};

export default App;
