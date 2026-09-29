export function saveUser(user) {
  localStorage.setItem("ticketUser", JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem("ticketUser");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
}