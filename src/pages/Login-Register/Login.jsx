import React, { useState } from 'react';
import '../../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const sampleUsers = [
    { username: 'johndoe', password: 'password123' },
    { username: 'janedoe', password: 'securepass' },
    { username: 'admin', password: 'adminpass' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    const user = sampleUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      alert('Login successful!');
      // return to homepage (or profile page)
    } else {
      setLoginError('Invalid username or password');
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
          <p className="register-p">Don't have an <br /> account yet?</p>
          <button className="sign-up-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
