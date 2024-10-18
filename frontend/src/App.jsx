import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Corrected import
import './index.css';

import Signup from './Signup';
import Login from './Login';

function App() {
  return (
    <Router>
      <div>
        {/* Display Signup component */}
        <Signup />

        {/* Define routes inside the Routes component */}
        <Routes>
          {/* Route for login page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
