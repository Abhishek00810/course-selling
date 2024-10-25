import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Corrected import

import App from './App.jsx'
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import Adminlogin from './adminLogin.jsx';
import Landing from './Landing.jsx';

import './index.css'
import 'remixicon/fonts/remixicon.css'
import Create from './Create.jsx';
import Adminsignup from './adminSignup.jsx';
import Admincourse from './Admincourse.jsx';


createRoot(document.getElementById('root')).render(
  <Router>
  <div>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Landing />} />

      <Route path="/home" element={<Home />} />

      <Route path="/adminlogin" element={<Adminlogin />} />

      <Route path="/create" element={<Create />} />

      
      <Route path="/adminsignup" element={<Adminsignup />} />
      
      <Route path="/admincourse" element={<Admincourse />} />

    </Routes>
  </div>
</Router>
)
