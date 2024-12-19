import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation to the dashboard
import axios from 'axios'; // For API calls

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Default user type
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
        const response = await axios.post(
            'http://localhost:5226/products/login', 
            {
              userId,
              password,
              userType,
            },
            {
              headers: {
                'Content-Type': 'application/json', // Set content type to JSON
              },
            }
          );

      // Assuming the API returns a success status
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        navigate('/dashboard'); // Navigate to the dashboard
      }
    } catch (err) {
      console.error('Login failed:', err.response || err);
      setError('Invalid credentials or server error. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>User ID:</label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>User Type:</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
