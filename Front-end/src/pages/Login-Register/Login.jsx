import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(''); 
  
    try {
      // Get reqsponse from back-end server
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Checking server response
      if (response.ok) {
        const data = await response.json(); 
        alert('Login successful!');
        navigate('/'); // Redirect to homepage 
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error('Error:', error);
      alert("Unable to connect to the server. Please check your network connection."); // Catching server-related errors
    }
  };

  return (
    <div className="login-container-position">
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {loginError && <p className="error">{loginError}</p>}
          <button type="submit">Login</button>
        </form>
        <hr />
        <div className="signup">
          <p className="register-p">
            Don't have an <br /> account yet?
          </p>
          <button className="sign-up-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
