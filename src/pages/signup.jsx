import { useState } from "react";
import "./Signup.css";
import { saveUser } from "../services/auth";

function Signup({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    console.log("User data:", user);
    saveUser(user);

    alert("Account created successfully!");

    onLogin();
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Create your account to access the dashboard
        </p>

        <form onSubmit={handleSignup}>
          <div>
            <div className="signup-form-group">
              <label>Full Name :</label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="signup-form-group">
              <label>Email :</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="signup-form-group">
              <label>Password :</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="signup-form-group">
              <label>Confirm Password :</label>

              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </div>
        </form>

        <div className="login-link">
          <span>Already have an account?</span>

          <button type="button" onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;