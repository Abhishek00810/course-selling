import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Correct import
import './index.css';

import Signup from './Signup';
import Login from './Login';
import Create from './Create';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Route for signup page */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Route for create page */}
          <Route path="/create" element={<Create />} />

          <Route path="/" element={<Signup />} />  {/* Default route, renders Signup component */}

        </Routes>
      </div>
    </Router>
  );
}

export default App;
