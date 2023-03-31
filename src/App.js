import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';

import './App.css';
import AuthPage from './pages/AuthPage';

const App = () => (
      <div className="App">
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='auth' element={<AuthPage />} />
        </Routes>
    </div>
  );

export default App;
