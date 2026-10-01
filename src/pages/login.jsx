import { useState } from "react";
import "./login.css";
import { loginUser } from "../services/auth";

function Login({ onSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await loginUser({
        email: email,
        password: password,
      });
      onLoginSuccess();

        
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome To The Dashboard</h1>
        <p>please enter your credentials to login the dashboard</p>

        <form onSubmit={handleLogin}>
          <div>
            <div className="login-form-group">
              <label>Email :</label>
              <input
                className="password-input"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-form-group">
              <label>Password :</label>
              <input
                className="password-input"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="signup-link">
              <span>New user?</span>
              <button type="button" onClick={onSignup}>
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;