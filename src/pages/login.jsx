import { useState } from "react";
import "./login.css";
import { loginUser } from "../services/auth";
import { Eye, EyeOff } from "lucide-react";

function Login({ onSignup, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

        <p>Please enter your credentials to login to the dashboard</p>

        <form onSubmit={handleLogin}>
          <div>
            {/* ================= EMAIL ================= */}

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

            {/* ================= PASSWORD ================= */}

            <div className="login-form-group">
              <label>Password :</label>

              <div className="password-wrapper">
                <input
                  className="password-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* ================= SIGNUP ================= */}

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