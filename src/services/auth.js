<<<<<<< HEAD

const API_BASE_URL = "http://localhost:8000/api";

=======
const API_BASE_URL = "http://10.207.45.233:8000/api";
>>>>>>> b8528a24c8a7934d73669a68bb252c03e18a4869

// Send signup request to FastAPI backend (which inserts into MySQL)
export async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Signup failed");
  }

  return await response.json();
}

// Send login request to FastAPI backend (which checks password in MySQL)
export async function loginUser(credentials) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Invalid email or password");
  }

  const data = await response.json();
  // Store JWT token and user info in localStorage for session persistence
  localStorage.setItem("ticketToken", data.access_token);
  localStorage.setItem("ticketUser", JSON.stringify(data.user));
  return data;
}

export function getUser() {
  const user = localStorage.getItem("ticketUser");
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem("ticketToken");
  localStorage.removeItem("ticketUser");
}