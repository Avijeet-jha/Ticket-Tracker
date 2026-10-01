const API_BASE_URL =
  typeof window !== "undefined"
    ? `http://${window.location.hostname}:8000/api`
    : "http://localhost:8000/api";

// Fetch all tickets from the FastAPI backend (stored in MySQL)
export async function fetchTickets(statusFilter = "All") {
  const queryParam =
    statusFilter && statusFilter !== "All"
      ? `?status_filter=${encodeURIComponent(statusFilter)}`
      : "";

  const response = await fetch(`${API_BASE_URL}/tickets${queryParam}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to fetch tickets from database");
  }

  return await response.json();
}

// Update ticket status (e.g. 'Accepted', 'Rejected') directly in MySQL
export async function updateTicketStatus(ticketId, status, rejectionReason = null) {
  const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
      rejection_reason: rejectionReason,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to update ticket status in database");
  }

  return await response.json();
}
