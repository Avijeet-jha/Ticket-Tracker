import "./login.css";
import Signup from "./signup";



function Login({onSignup}) {
    return (
        <div className="login-page">
            <div className="login-card">
                <h1>Welcome To The Dashboard</h1>
                <p>please enter your credentials to login the dashboard</p>

                <form>
                    <div>
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
    )
}

export default Login;