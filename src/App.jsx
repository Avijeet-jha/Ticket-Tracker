import { useState } from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  const [page, setPage] = useState("login");

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