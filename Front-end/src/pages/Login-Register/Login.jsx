import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication_Context/Auth_Provider";
import "../../css/Login.css";

const Login = () => {

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { setUser,login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(''); 
  
    try {
      // Get reqsponse from back-end server
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, password }),
      });

      // Checking server response
      if (response.ok) {
        const data = await response.json(); 
        
        alert(data.msg); 
        setUser(data.user);
        login();
        navigate('/'); // Redirect to homepage 
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert("Unable to connect to the server. Please check your network connection."); // Catching server-related errors
    }
  };

  return (
    <div className="login-page">
      <div className="login-container-position">
        <div className="login-container">
          <h2>Sign In</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="UserName">UserName</label>
              <input
                type="text"
                id="userName"
                value={userName}
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
            <NavLink to="/register">
            <button className="sign-up-button">Sign Up</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
