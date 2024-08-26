import React, { useState } from "react";
import "../../css/Register.css";

const Register = () => {
  return (
    <div className="register-container-position">
      <div className="register-container">
        <h2>Sign Up</h2>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              //value={username}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              //value={password}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              //value={confirmPassword}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <hr />
        <div className="signup">
          <p>
            Already have <br /> an account?{" "}
          </p>
          <button /*onClick={}*/>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
