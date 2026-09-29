import "./login.css";

const Login = () => {
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Welcome To The Dashboard</h1>
                <p>please enter your credentials to login the dashboard</p>

                <form>
                    <div className="form-group">
                        <label>Email :</label>
                        <input className="password-input"
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password :</label>
                        <input className="password-input"
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>

                    <div className="signup-section">
                        <span>New user?</span>
                        <button type="button" className="signup-btn">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;