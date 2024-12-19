import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AssignTask from './components/AssignTask';
import UpdateTask from './components/UpdateTask';

function App() {
  const [userType, setUserType] = useState(null);

  // Retrieve user type from localStorage (or global state) when app loads
  useEffect(() => {
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserType={setUserType} />} />
        <Route path="/dashboard" element={<Dashboard userType={userType} />} />
        <Route path="/assign-task" element={<AssignTask />} />
        <Route path="/update-task" element={<UpdateTask />} />
      </Routes>
    </Router>
  );
}

export default App;
