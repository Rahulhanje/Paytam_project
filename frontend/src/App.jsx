import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {Signup} from './pages/singup';
import {Signin} from './pages/signin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
