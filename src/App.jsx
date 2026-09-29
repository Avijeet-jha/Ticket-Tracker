import { useState } from "react";
import Login from "./pages/login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" ? (
        <Login onSignup={() => setPage("signup")} />
      ) : (
        <Signup onLogin={() => setPage("login")} />
      )}
    </>
  );
}

export default App;