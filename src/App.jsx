import { useState } from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
    const [page, setPage] = useState("dashboard");
  return (
    <>
      {page === "login" && (
        <Login
          onSignup={() => setPage("signup")}
        />
      )}

      {page === "signup" && (
        <Signup
          onLogin={() => setPage("login")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard />
      )}
    </>
  );
}

export default App;