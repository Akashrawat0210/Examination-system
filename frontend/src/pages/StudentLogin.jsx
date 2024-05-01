import React, { useState } from 'react';
import axios from 'axios';
import './style/login.css'

const StudentLogin = () =>  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password
      });

      if (response.data.success) {
        // Redirect to student dashboard or marksheet page
        alert('Login successful');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Id </label>
          <input style={{outline:"none"}}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input style={{outline:"none"}}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}


export default StudentLogin

