import { useState, useEffect } from "react";
import "./Dashboard.css";
import { fetchTickets, updateTicketStatus } from "../services/tickets";
<<<<<<< HEAD
import { getUser } from "../services/auth";
=======
import { getUser, logoutUser } from "../services/auth";
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a

function Dashboard({ onLogout }) {
  const user = getUser();
  const username = user ? user.name : "User";
  const [activeFilter, setActiveFilter] = useState("All");
  const [showProfile, setShowProfile] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const currentUser = getUser();
  const displayName = currentUser?.name || username;

  // Load all tickets from MySQL database on mount
  useEffect(() => {
    loadTickets();
  }, []);

  async function loadTickets() {
    try {
      setIsLoading(true);
      setErrorMsg("");
      const data = await fetchTickets();
      setTickets(data);
    } catch (err) {
      console.error("Error loading tickets from database:", err);
      setErrorMsg(
        "Failed to connect to database. Make sure backend is running.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Approve ticket directly in database
  async function handleApprove(id) {
    try {
      const updated = await updateTicketStatus(id, "Accepted", null, currentUser?.id);
      setTickets((currentTickets) =>
<<<<<<< HEAD
        currentTickets.map((t) => (t.id === id ? { ...t, status: updated.status, reviewed_by_name: updated.reviewed_by_name || displayName } : t))
=======
        currentTickets.map((t) =>
          t.id === id ? { ...t, status: updated.status } : t,
        ),
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
      );
    } catch (err) {
      console.error("Failed to approve ticket in database:", err);
      alert("Failed to update ticket in database: " + err.message);
    }
  }

  // Reject ticket directly in database
  async function handleReject(id) {
    try {
      const updated = await updateTicketStatus(id, "Rejected", null, currentUser?.id);
      setTickets((currentTickets) =>
<<<<<<< HEAD
        currentTickets.map((t) => (t.id === id ? { ...t, status: updated.status, reviewed_by_name: updated.reviewed_by_name || displayName } : t))
=======
        currentTickets.map((t) =>
          t.id === id ? { ...t, status: updated.status } : t,
        ),
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
      );
    } catch (err) {
      console.error("Failed to reject ticket in database:", err);
      alert("Failed to update ticket in database: " + err.message);
    }
  }

<<<<<<< HEAD


=======
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
  // Ticket counts
  const totalTickets = tickets.length;

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending",
  ).length;

  const acceptedTickets = tickets.filter(
    (ticket) => ticket.status === "Accepted",
  ).length;

  const rejectedTickets = tickets.filter(
    (ticket) => ticket.status === "Rejected",
  ).length;

<<<<<<< HEAD
  const myApprovedTickets = tickets.filter(
    (ticket) =>
      ticket.status === "Accepted" &&
      (ticket.reviewed_by_id === currentUser?.id ||
       ticket.reviewed_by_name?.toLowerCase() === displayName?.toLowerCase())
  ).length;

  // Filter tickets
  const visibleTickets = tickets.filter((ticket) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "My Approved") {
      return (
        ticket.status === "Accepted" &&
        (ticket.reviewed_by_id === currentUser?.id ||
         ticket.reviewed_by_name?.toLowerCase() === displayName?.toLowerCase())
      );
    }
    return ticket.status === activeFilter;
  });

=======
  // Filter tickets
  const visibleTickets = tickets.filter(
    (ticket) => activeFilter === "All" || ticket.status === activeFilter,
  );
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a

  return (
    <div className="dashboard-page">
      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">
        <div className="navbar-title">
          <h1>Ticket Management</h1>
        </div>

        <div className="navbar-user">
<<<<<<< HEAD

          <span className="username">
            {displayName}
          </span>
=======
          <span className="username">{username}</span>
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a

          <div className="profile-container">
            <button
              type="button"
              className="profile-btn"
              onClick={() => setShowProfile(!showProfile)}
            >
              👤
            </button>

            {showProfile && (
              <div className="profile-menu">
<<<<<<< HEAD

                <p>{displayName}</p>
=======
                <p>{username}</p>
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a

                <button
                  onClick={() => {
                    logoutUser();
                    onLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
<<<<<<< HEAD


=======
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
          </div>
        </div>
      </nav>

      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-content">
        <div className="dashboard-heading">
          <h2>Dashboard</h2>

          <p>Manage and review submitted tickets</p>
        </div>

        {/* ================= STATISTICS ================= */}

        <div className="stats-container">
          <button
            type="button"
            className={`stat-card ${
              activeFilter === "All" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("All")}
          >
            <span className="stat-title">Total Tickets</span>

            <span className="stat-number">{totalTickets}</span>
          </button>

          <button
            type="button"
            className={`stat-card ${
              activeFilter === "Pending" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("Pending")}
          >
            <span className="stat-title">Pending Tickets</span>

            <span className="stat-number">{pendingTickets}</span>
          </button>

          <button
            type="button"
            className={`stat-card ${
              activeFilter === "Accepted" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("Accepted")}
          >
            <span className="stat-title">Accepted Tickets</span>

            <span className="stat-number">{acceptedTickets}</span>
          </button>

          <button
            type="button"
            className={`stat-card ${
              activeFilter === "Rejected" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("Rejected")}
          >
            <span className="stat-title">Rejected Tickets</span>

            <span className="stat-number">{rejectedTickets}</span>
          </button>
<<<<<<< HEAD

          <button
            type="button"
            className={`stat-card ${
              activeFilter === "My Approved" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("My Approved")}
          >
            <span className="stat-title">
              Approved by Me
            </span>

            <span className="stat-number">
              {myApprovedTickets}
            </span>
          </button>

=======
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
        </div>

        {/* ================= TICKET LIST ================= */}

        <section className="ticket-section">
          <div className="ticket-section-header">
            <div>
              <h2>Tickets</h2>

              <p>Showing {activeFilter.toLowerCase()} tickets</p>
            </div>

            <div className="ticket-filters">
<<<<<<< HEAD

              {["All", "Pending", "Accepted", "Rejected", "My Approved"].map(
                (filter) => (

                  <button
                    type="button"
                    key={filter}
                    className={
                      activeFilter === filter
                        ? "active-filter"
                        : ""
                    }
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>

                )
              )}

=======
              {["All", "Pending", "Accepted", "Rejected"].map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={activeFilter === filter ? "active-filter" : ""}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
            </div>
          </div>

          {/* ================= TABLE ================= */}

          <div className="ticket-table-container">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Issue</th>
                  <th>Description</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Reviewed By</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" className="no-tickets">
                      Loading tickets from database...
                    </td>
                  </tr>
                ) : visibleTickets.length === 0 ? (
                  <tr>
<<<<<<< HEAD
                    <td
                      colSpan="7"
                      className="no-tickets"
                    >
                      {errorMsg || `No ${activeFilter.toLowerCase()} tickets found.`}
=======
                    <td colSpan="6" className="no-tickets">
                      {errorMsg ||
                        `No ${activeFilter.toLowerCase()} tickets found.`}
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
                    </td>
                  </tr>
                ) : (
                  visibleTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="ticket-id-cell">
                        {ticket.ticket_number || `#${ticket.id}`}
                      </td>

                      <td>
                        <strong>{ticket.title}</strong>
                      </td>

                      <td className="description-cell">{ticket.description}</td>

                      <td>{ticket.dateTime}</td>

                      <td>
<<<<<<< HEAD
                        {ticket.dateTime}
                      </td>

                      <td>
=======
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
                        <span
                          className={`ticket-status ${ticket.status.toLowerCase()}`}
                        >
                          {ticket.status}
                        </span>
                      </td>

                      <td>
<<<<<<< HEAD
                        {ticket.reviewed_by_name ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "4px 10px",
                              borderRadius: "16px",
                              fontSize: "12px",
                              fontWeight: "600",
                              backgroundColor:
                                ticket.reviewed_by_name.toLowerCase() === displayName.toLowerCase()
                                  ? "#e0f2fe"
                                  : "#f1f5f9",
                              color:
                                ticket.reviewed_by_name.toLowerCase() === displayName.toLowerCase()
                                  ? "#0284c7"
                                  : "#475569",
                              border:
                                ticket.reviewed_by_name.toLowerCase() === displayName.toLowerCase()
                                  ? "1px solid #bae6fd"
                                  : "1px solid #e2e8f0",
                            }}
                          >
                            👤 {ticket.reviewed_by_name}
                            {ticket.reviewed_by_name.toLowerCase() === displayName.toLowerCase() && " (You)"}
                          </span>
                        ) : (
                          <span style={{ color: "#94a3b8" }}>—</span>
                        )}
                      </td>

                      <td>
=======
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
                        {ticket.status === "Pending" ? (
                          <div className="action-buttons">
                            <button
                              type="button"
                              className="approve-btn"
                              onClick={() => handleApprove(ticket.id)}
                            >
                              Approve
                            </button>

                            <button
                              type="button"
                              className="reject-btn"
                              onClick={() => handleReject(ticket.id)}
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
<<<<<<< HEAD
                          <div className="action-completed-box">
                            <span className="action-completed">
                              {ticket.status}
                            </span>
                          </div>
=======
                          <span className="action-completed">Completed</span>
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
                        )}
                      </td>
                    </tr>
                  ))
<<<<<<< HEAD


=======
>>>>>>> f803ad602e90b782884ebd06899a5c27fc89cd2a
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="dashboard-footer">
        <p>© 2026 Ticket Management System. All Rights Reserved.</p>

        <p>Ticket Management Dashboard</p>
      </footer>
    </div>
  );
}

export default Dashboard;
