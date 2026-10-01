import { useState, useEffect } from "react";
import "./Dashboard.css";
import { fetchTickets, updateTicketStatus } from "../services/tickets";


function Dashboard({ onLogout, username = "Manager" }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showProfile, setShowProfile] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

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
      setErrorMsg("Failed to connect to database. Make sure backend is running.");
    } finally {
      setIsLoading(false);
    }
  }

  // Approve ticket directly in database
  async function handleApprove(id) {
    try {
      const updated = await updateTicketStatus(id, "Accepted");
      setTickets((currentTickets) =>
        currentTickets.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
      );
    } catch (err) {
      console.error("Failed to approve ticket in database:", err);
      alert("Failed to update ticket in database: " + err.message);
    }
  }

  // Reject ticket directly in database
  async function handleReject(id) {
    try {
      const updated = await updateTicketStatus(id, "Rejected");
      setTickets((currentTickets) =>
        currentTickets.map((t) => (t.id === id ? { ...t, status: updated.status } : t))
      );
    } catch (err) {
      console.error("Failed to reject ticket in database:", err);
      alert("Failed to update ticket in database: " + err.message);
    }
  }


  // Ticket counts
  const totalTickets = tickets.length;

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending"
  ).length;

  const acceptedTickets = tickets.filter(
    (ticket) => ticket.status === "Accepted"
  ).length;

  const rejectedTickets = tickets.filter(
    (ticket) => ticket.status === "Rejected"
  ).length;

  // Filter tickets
  const visibleTickets = tickets.filter(
    (ticket) =>
      activeFilter === "All" ||
      ticket.status === activeFilter
  );

  return (
    <div className="dashboard-page">

      {/* ================= NAVBAR ================= */}

      <nav className="dashboard-navbar">

        <div className="navbar-title">
          <h1>Ticket Management</h1>
        </div>

        <div className="navbar-user">

          <span className="username">
            {username}
          </span>

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

                <p>{username}</p>

                <button
                  type="button"
                  onClick={onLogout}
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </nav>


      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-content">

        <div className="dashboard-heading">
          <h2>Dashboard</h2>

          <p>
            Manage and review submitted tickets
          </p>
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
            <span className="stat-title">
              Total Tickets
            </span>

            <span className="stat-number">
              {totalTickets}
            </span>
          </button>


          <button
            type="button"
            className={`stat-card ${
              activeFilter === "Pending" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("Pending")}
          >
            <span className="stat-title">
              Pending Tickets
            </span>

            <span className="stat-number">
              {pendingTickets}
            </span>
          </button>


          <button
            type="button"
            className={`stat-card ${
              activeFilter === "Accepted" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("Accepted")}
          >
            <span className="stat-title">
              Accepted Tickets
            </span>

            <span className="stat-number">
              {acceptedTickets}
            </span>
          </button>


          <button
            type="button"
            className={`stat-card ${
              activeFilter === "Rejected" ? "selected-card" : ""
            }`}
            onClick={() => setActiveFilter("Rejected")}
          >
            <span className="stat-title">
              Rejected Tickets
            </span>

            <span className="stat-number">
              {rejectedTickets}
            </span>
          </button>

        </div>


        {/* ================= TICKET LIST ================= */}

        <section className="ticket-section">

          <div className="ticket-section-header">

            <div>
              <h2>Tickets</h2>

              <p>
                Showing {activeFilter.toLowerCase()} tickets
              </p>
            </div>

            <div className="ticket-filters">

              {["All", "Pending", "Accepted", "Rejected"].map(
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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="no-tickets">
                      Loading tickets from database...
                    </td>
                  </tr>
                ) : visibleTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="no-tickets"
                    >
                      {errorMsg || `No ${activeFilter.toLowerCase()} tickets found.`}
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

                      <td className="description-cell">
                        {ticket.description}
                      </td>

                      <td>
                        {ticket.dateTime}
                      </td>

                      <td>

                        <span
                          className={`ticket-status ${ticket.status.toLowerCase()}`}
                        >
                          {ticket.status}
                        </span>

                      </td>

                      <td>

                        {ticket.status === "Pending" ? (

                          <div className="action-buttons">

                            <button
                              type="button"
                              className="approve-btn"
                              onClick={() =>
                                handleApprove(ticket.id)
                              }
                            >
                              Approve
                            </button>

                            <button
                              type="button"
                              className="reject-btn"
                              onClick={() =>
                                handleReject(ticket.id)
                              }
                            >
                              Reject
                            </button>

                          </div>

                        ) : (

                          <span className="action-completed">
                            Completed
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>


      {/* ================= FOOTER ================= */}

      <footer className="dashboard-footer">

        <p>
          © 2026 Ticket Management System. All Rights Reserved.
        </p>

        <p>
          Ticket Management Dashboard
        </p>

      </footer>

    </div>
  );
}

export default Dashboard;