import "./Signup.css";

function Signup({ onLogin }) {
  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create Account</h1>
        <p className="signup-subtitle">
          Create your account to access the dashboard
        </p>

        <form>

          <div className="signup-form-group">
            <label>Full Name :</label>
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="signup-form-group">
            <label>Email :</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="signup-form-group">
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="signup-form-group">
            <label>Confirm Password :</label>
            <input
              type="password"
              placeholder="Confirm your password"
            />
          </div>

          <button type="button"  className="login"
            onClick={onLogin}
          >
            Sign Up
          </button>

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