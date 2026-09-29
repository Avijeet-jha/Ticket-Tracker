import "./login.css";

const Login = () => {
  return (
    <div className="login-page">
        <div className="login-card">
            <h1>welcome the Dashboard</h1>
            <p>please enter your credentials to login the dashboard</p>

            <form>
                <div className="form-group">
                    <label>Email :</label>
                    <input type="email" placeholder="Enter your email" className="login-input" />
                </div>
                <div className="form-group">
                    <label>Password :</label>
                    <input type="password" placeholder="Enter your password" className="login-input" />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login;