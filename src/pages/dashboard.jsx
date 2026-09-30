import { useState } from "react";
import "./Dashboard.css";

function Dashboard({ onLogout, username = "Manager" }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showProfile, setShowProfile] = useState(false);

  const [tickets, setTickets] = useState([
    {
      id: 101,
      title: "Login Issue",
      description: "Unable to login to the system",
      user: "Rahul",
      dateTime: "30 Sep 2026, 09:30 AM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 102,
      title: "System Error",
      description: "Error while opening the dashboard",
      user: "Priya",
      dateTime: "30 Sep 2026, 10:15 AM",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 103,
      title: "Password Reset",
      description: "User requested a password reset",
      user: "Amit",
      dateTime: "30 Sep 2026, 11:00 AM",
      priority: "Low",
      status: "Accepted",
    },
    {
      id: 104,
      title: "Account Access",
      description: "Unable to access the employee account",
      user: "Sneha",
      dateTime: "30 Sep 2026, 11:30 AM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 105,
      title: "Email Issue",
      description: "Unable to receive system emails",
      user: "Rohit",
      dateTime: "30 Sep 2026, 12:00 PM",
      priority: "Medium",
      status: "Rejected",
    },
    {
      id: 106,
      title: "Dashboard Error",
      description: "Dashboard showing incorrect information",
      user: "Neha",
      dateTime: "30 Sep 2026, 12:30 PM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 107,
      title: "Profile Update",
      description: "Unable to update profile information",
      user: "Karan",
      dateTime: "30 Sep 2026, 01:00 PM",
      priority: "Low",
      status: "Accepted",
    },
    {
      id: 108,
      title: "Report Issue",
      description: "Unable to generate monthly report",
      user: "Anjali",
      dateTime: "30 Sep 2026, 01:30 PM",
      priority: "Medium",
      status: "Pending",
    },
    {
      id: 109,
      title: "Server Problem",
      description: "Server response is taking too long",
      user: "Vikas",
      dateTime: "30 Sep 2026, 02:00 PM",
      priority: "High",
      status: "Rejected",
    },
    {
      id: 110,
      title: "Notification Issue",
      description: "Notifications are not appearing",
      user: "Pooja",
      dateTime: "30 Sep 2026, 02:30 PM",
      priority: "Low",
      status: "Pending",
    },
    {
      id: 111,
      title: "Database Error",
      description: "Unable to retrieve database records",
      user: "Arjun",
      dateTime: "30 Sep 2026, 03:00 PM",
      priority: "High",
      status: "Pending",
    },
    {
      id: 112,
      title: "Application Error",
      description: "Application closes unexpectedly",
      user: "Riya",
      dateTime: "30 Sep 2026, 03:30 PM",
      priority: "Medium",
      status: "Accepted",
    },
  ]);

  // Approve ticket
  function handleApprove(id) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: "Accepted" }
          : ticket
      )
    );
  }

  // Reject ticket
  function handleReject(id) {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === id
          ? { ...ticket, status: "Rejected" }
          : ticket
      )
    );
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

                {visibleTickets.length === 0 ? (

                  <tr>
                    <td
                      colSpan="6"
                      className="no-tickets"
                    >
                      No {activeFilter.toLowerCase()} tickets found.
                    </td>
                  </tr>

                ) : (

                  visibleTickets.map((ticket) => (

                    <tr key={ticket.id}>

                      <td className="ticket-id-cell">
                        #{ticket.id}
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