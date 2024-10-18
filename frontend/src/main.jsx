import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Corrected import

import App from './App.jsx'
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import './index.css'
import 'remixicon/fonts/remixicon.css'
createRoot(document.getElementById('root')).render(
  <Router>
  <div>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Signup />} />

      <Route path="/home" element={<Home />} />
    </Routes>
  </div>
</Router>
)
