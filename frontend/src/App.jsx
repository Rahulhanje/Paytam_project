import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import {Signup} from './pages/singup';
import {Signin} from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { SendMoney } from './pages/sendMoney';

function App() {
  return (<>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Navigate to="/signup" />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/signin" element={<Signin />} />
         <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sendMoney" element={<SendMoney />} />
      </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
