import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../css/Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userAvatar, setUserAvatar] = useState(null); // For storing the selected avatar image
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");

    // Creating a FormData object to include both text and file data
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("userName", userName);
    formData.append("password", password);
    if (userAvatar) formData.append("userAvatar", userAvatar); // Attach avatar file if selected

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        body: formData, // Send formData instead of JSON
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/login"); // Redirect to login page
      } else {
        const errorData = await response.json();
        setRegisterError(errorData.message);
      }
    } catch (err) {
      console.error("Error:", err);
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
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUserName(e.target.value)}
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
              <label htmlFor="userAvatar">Upload Avatar:</label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={(e) => setUserAvatar(e.target.files[0])} // Store the selected image file
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
