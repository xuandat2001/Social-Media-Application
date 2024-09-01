import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError('');

    if (password !== confirmPassword) {
      setRegisterError('Passwords do not match.');
      return;
    }

    try {
      // Get reqsponse from back-end server
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message); 
        navigate('/login'); // Redirect to login page
      } else {
        const errorData = await response.json();
        setRegisterError(errorData.message); 
      }
    } catch (err) {
      console.error('Error:', err);
      setRegisterError("Unable to connect to the server. Please check your network connection.");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container-position">
        <div className="register-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {registerError && <p className="error">{registerError}</p>}
            <button type="submit">Register</button>
          </form>
          <hr />
          <div className="signup">
            <p>
              Already have <br /> an account?{" "}
            </p>
            <NavLink to="/login">
            <button>Sign In</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
