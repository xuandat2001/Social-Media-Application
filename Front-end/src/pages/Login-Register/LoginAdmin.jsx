import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { userName, password };

    try {
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.status === 200) {
        alert('Login successful!');
        navigate('/admin/userManagement')
      } else {
        setErrorMessage(result.msg || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred while logging in.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h3 className="text-center mb-4">Admin Login</h3>

          {errorMessage && (
            <div className="alert alert-danger text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
