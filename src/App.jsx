import { useState } from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Dashboard from "./pages/dashboard.jsx";

function App() {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("ticketUser") ? "dashboard" : "login";
  });

  return (
    <>
      {page === "login" && (
        <Login
          onSignup={() => setPage("signup")}
          onLoginSuccess={() => setPage("dashboard")}
        />
      )}

      {page === "signup" && (
        <Signup
          onLogin={() => setPage("login")}
        />
      )}

      {page === "dashboard" && (
        <Dashboard
          onLogout={() => {
            localStorage.removeItem("ticketUser");
            localStorage.removeItem("ticketToken");
            setPage("login");
          }}
        />
      )}
    </>
  );
}


export default App;